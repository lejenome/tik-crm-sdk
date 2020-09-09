import * as Sentry from '@sentry/browser'
import qs from 'querystringify'

export const config = {
  authToken: null,
  instructorAuthToken: null,
}

export function base_domain() {
  if (process.env.NODE_ENV !== 'production') {
    return process.env.API_BASE_URL_DEV || process.env.API_BASE_URL
  } else {
    return process.env.API_BASE_URL
  }
}

export function base_url() {
  if (process.env.NODE_ENV !== 'production') {
    return (
      (process.env.API_BASE_URL_DEV || process.env.API_BASE_URL) +
      (process.env.API_PREFIX_DEV || process.env.API_PREFIX || '/api/')
    )
  } else {
    return process.env.API_BASE_URL + (process.env.API_PREFIX || '/api/')
  }
}

class BaseApi {
  constructor() {
    this.base_domain = base_domain()
    this.base_url = base_url()
    this.lookup_field = 'id'
    this.useCache = {
      list: false,
      get: false,
    }
    this.validateCache = true
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
    if (json) {
      if (Object.values(json).some((v) => v instanceof File)) {
        const data = new FormData()
        for (let [k, v] of Object.entries(json)) {
          if (v === null) {
            v = ''
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
    let url = `${this.base_url}${path}/`
    if (json && method === 'GET') {
      url += qs.stringify(json, true)
      json = null
    }
    let req
    try {
      if (config.authToken) {
        headers.Authorization = 'Bearer ' + config.authToken
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
      Sentry.captureException(e)
      throw e
    }
  }

  toObj(o) {
    return o
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
    // const el = this.data.filter((el) => el.id === id);
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
    if ((el.id || id) && !forceCreate) {
      const instance = await this.http(
        partial_update ? 'PATCH' : 'PUT',
        id || el.id,
        el,
        allow404
      )
      return this.toObj(instance)
      /*
      const instance = this.get(el.id);
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
      const nextId = Math.max(...this.data.map((c) => c.id)) + 1;
      el.id = nextId;
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
