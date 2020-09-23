import BaseApi from './base'

export class UsersApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'users'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  async me() {
    const obj = await this.http('GET', 'me', null, true)
    return this.toObj(obj)
  }

  async activate(id, token) {
    return await this.http('POST', `${id}/activate`, { token }, true)
  }

  async get_by_email(email) {
    return await this.http('POST', 'email', { email }, true)
  }
}

const api = new UsersApi()

export default api
