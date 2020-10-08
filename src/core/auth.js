import * as Sentry from '@sentry/browser'
import BaseApi from './base.js'
// import usersApi from './users.js'
import staffsApi from '../crm/staffs.js'
import cache from '../utils/cache.js'

export class AuthApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'auth'
    // this.configCache({ list: true }, 60 * 60 * 1000)
    this.me = {}
    this.ns = {
      me: 'me',
      token: 'token',
      authToken: 'authToken',
    }
  }

  async fetchMe() {
    // return await usersApi.me()
    return await staffsApi.me()
  }

  async user() {
    const obj = await this.http('GET', 'user', null, true)
    return this.toObj(obj)
  }

  async currentUser() {
    if (this.me && this.me.id) {
      return this.me
    } else {
      let resp
      if (cache.has(this.ns.me)) {
        resp = cache.get(this.ns.me)
      }
      if (navigator.onLine) {
        try {
          resp = await this.fetchMe()
        } catch (e) {
          console.error(e)
        }
      }
      if (!resp) {
        await this.logout()
        return null
      }
      cache.set(this.ns.me, resp)
      this.me = resp

      Sentry.configureScope((scope) => {
        scope.setUser({ id: this.me.email })
      })
      return this.me
    }
  }

  async login(email, password) {
    const resp = await this.http('POST', 'login', { email, password }, true)
    if (resp.access_token) {
      this.session[this.ns.authToken] = resp.access_token
      cache.set(this.ns.token, { token: resp.access_token })
      return true
    } else {
      return false
    }
  }

  async isLoggedin() {
    const token = cache.get(this.ns.token)
    if (token) {
      let resp = true
      if (navigator.onLine) {
        resp = await this.http('POST', 'token/verify', token, true)
        resp = resp && resp.code !== 'token_not_valid'
      }
      if (resp) {
        this.session[this.ns.authToken] = token.token
        console.log(this.session)
        return true
      }
    }
    cache.del(this.ns.token)
    return false
  }

  async logout() {
    await this.http('POST', 'logout', {})
    this.me = {}
    this.session[this.ns.authToken] = null
    cache.del(this.ns.token)
    cache.del(this.ns.me)
    Sentry.configureScope((scope) => {
      scope.setUser({})
    })
  }

  async passwordRequestReset(email) {
    return await this.http('POST', 'password/reset', { email })
  }

  async passwordReset({ token, uid, password }) {
    return await this.http('POST', 'password/reset/confirm', {
      uid,
      token,
      new_password1: password,
      new_password2: password,
    })
  }

  async confirmEmail(key) {
    return await this.http('POST', 'register/verify-email', { key })
  }

  async register(user) {
    return await this.http('POST', 'register', {
      ...user,
      password1: user.password,
      password2: user.password,
    })
  }

  async socialaccounts() {
    return await this.http('GET', 'socialaccounts')
  }

  async socialapps() {
    return await this.http('GET', 'socialapps')
    /*
    return [
      'google',
      'linkedin_oauth2',
      'microsoft',
      'facebook',
      'twitter',
    ]
    */
  }
  async redirectSocialLogin(provider) {
    const url = this.get_url(provider)
    globalThis.location.href = url
  }

  async socialLogin(provider, params) {
    const resp = await this.http('POST', `${provider}`, params, true)
    if (resp.access_token) {
      this.session[this.ns.authToken] = resp.access_token
      cache.set(this.ns.token, { token: resp.access_token })
      return true
    } else {
      return false
    }
  }
}

const authApi = new AuthApi()
export default authApi
