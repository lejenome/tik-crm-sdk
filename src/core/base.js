import * as Sentry from '@sentry/browser'
import qs from 'querystringify'
import { base_url, base_domain } from '../config.js'

if (!globalThis.tikSdkSession) {
  globalThis.tikSdkSession = {
    authToken: null,
    instructorAuthToken: null,
  }
}

class BaseApi {
  constructor() {
    this.resource = null
    this.model_name = ''
    this.verbose_name = ''
    this.verbose_name_plural = ''
    this.view_perm = ''
    this.add_perm = ''
    this.change_perm = ''
    this.delete_perm = ''
    this.lookup_field = 'id'

    this.useCache = {
      list: false,
      get: false,
    }
    this.validateCache = true
  }

  get base_domain() {
    return base_domain()
  }

  get base_url() {
    return base_url()
  }

  get session() {
    return globalThis.tikSdkSession
  }

  configCache(cache, timeout) {
    this.useCache = cache
    if (this._cacheTimeout) {
      clearInterval(this._cacheTimeout)
    }
    if (timeout) {
      this.cacheTimeout = timeout
      this._cacheTimeout = setInterval(() => {
        this.validateCache = true
      }, this.cacheTimeout)
    }
  }

  async http(method, path, json, allow404 = false) {
    if (path) {
      path = `${this.resource}/${path}`
    } else {
      path = `${this.resource}`
    }
    let headers = {}
    let url = `${this.base_url}${path}/`
    let req
    if (json && method === 'GET') {
      url += qs.stringify(json, true)
      json = null
    } else if (json) {
      if (Object.values(json).some((v) => v instanceof File)) {
        const data = new FormData()
        for (let [k, v] of Object.entries(json)) {
          if (v === null) {
            v = ''
          } else if (v instanceof Object && v.__proto__.isPrototypeOf(Object)) {
            v = JSON.stringify(v)
          }
          data.append(k, v)
        }
        json = data
      } else {
        json = JSON.stringify(json)
        headers = {
          'Content-Type': 'application/json; charset=utf-8',
        }
      }
    } else {
      json = undefined
    }
    console.log(method, path, json || '')
    try {
      if (this.session.authToken) {
        headers.Authorization = 'Bearer ' + this.session.authToken
      }
      req = await fetch(url, {
        method,
        headers,
        body: json,
        mode: 'cors',
        // credentials: 'include',
        cache: 'no-cache',
        redirect: 'follow',
        referrer: 'no-referrer',
      })
      if (!req.ok && !(allow404 && [404, 401].includes(req.status))) {
        const error = new Error(req.statusText || req.status)
        error.response = req
        throw error
      }
      if (method !== 'DELETE') {
        return await req.json()
      }
    } catch (e) {
      console.error(
        'HTTP Error:',
        url.toString(),
        JSON.stringify(json),
        req && req.status
      )
      console.log('Sentry', typeof Sentry, Sentry, Object.keys(Sentry))
      if (typeof Sentry === 'object' && 'captureException' in Sentry) {
        Sentry.captureException(e)
      }
      throw e
    }
  }

  toObj(o) {
    return o
  }

  toString(obj) {
    if (obj.title) {
      return obj.title
    } else if (obj.name) {
      return obj.name
    } else {
      return ''
    }
  }

  async list() {
    if (this.useCache.list && !this.validateCache && this.data) {
      console.log(`[HTTP] ${this.resource}.list(): using cache`)
    } else {
      const d = await this.http('GET', '')
      this.data = d
      this.validateCache = false
    }
    return this.data
  }

  async get(id, allow404 = false) {
    if (id) {
      const el = await this.http(
        'GET',
        id,
        /* json= */ null,
        /* allow404= */ allow404
      )
      return this.toObj(el)
    } else {
      return this.new()
    }
    /*
    // const el = this.data.filter((el) => el[this.lookup_field] === id);
    if (el.length === 1) {
      return el[0];
    } else {
      console.log("GET NEW");
      return this.new();
    }
    */
  }

  async save(
    el,
    id,
    forceCreate = false,
    partial_update = false,
    allow404 = false
  ) {
    this.validateCache = true
    if ((el[this.lookup_field] || id) && !forceCreate) {
      const instance = await this.http(
        partial_update ? 'PATCH' : 'PUT',
        id || el[this.lookup_field],
        el,
        allow404
      )
      return this.toObj(instance)
      /*
      const instance = this.get(el[this.lookup_field]);
      if (instance) {
        const old = Object.assign({}, instance);
        Object.assign(instance, el);
        if (this.preUpdate) {
          await this.preUpdate(old, instance);
        }
        if (this.postUpdate) {
          await this.postUpdate(old, instance);
        }
      }
      */
    } else {
      const instance = await this.http('POST', '', el, allow404)
      return instance
      /*
      const nextId = Math.max(...this.data.map((c) => c[this.lookup_field])) + 1;
      el[this.lookup_field] = nextId;
      if (this.preCreate) {
        await this.preCreate(el);
      }
      this.data.push(el);
      if (this.postCreate) {
        await this.postCreate(el);
      }
      */
    }
  }

  new() {
    return null
  }

  async delete(id) {
    this.validateCache = true
    return this.http('DELETE', id)
  }
}

export default BaseApi
