import BaseApi from './base'

export class UsersApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'users'
    this.model_name = 'user'
    this.verbose_name = 'User'
    this.verbose_name_plural = 'Users'
    this.view_perm = 'user:view'
    this.add_perm = 'user:add'
    this.change_perm = 'user:change'
    this.delete_perm = 'user:delete'
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

  toString(obj) {
    return `${obj.first_name || ''} ${obj.last_name || ''}`
  }
}

const api = new UsersApi()

export default api
