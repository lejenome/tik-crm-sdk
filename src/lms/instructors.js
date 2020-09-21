import BaseApi from '../core/base.js'

export class InstructorsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'instructors'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  async me() {
    return await this.http('GET', 'me', null, true)
  }

  async activate(id, token) {
    return await this.http('POST', `${id}/activate`, { token }, true)
  }

  async get_by_email(email) {
    return await this.http('POST', 'email', { email }, true)
  }

  async featured() {
    return await this.http('GET', 'featured')
  }
}

const api = new InstructorsApi()

export default api
