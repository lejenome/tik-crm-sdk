import { SaasApiMixin } from './base'
import { AuthApi as TenantAuthApi } from '../core/auth.js'
import usersApi from './users'

export class AuthApi extends SaasApiMixin(TenantAuthApi) {
  constructor() {
    super()
    this.ns = {
      me: 'me',
      token: 'token',
      authToken: 'authToken',
    }
  }

  async fetchMe() {
    return await usersApi.me()
  }
}

const authApi = new AuthApi()
export default authApi
