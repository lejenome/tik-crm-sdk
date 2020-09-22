import { UsersApi } from '../core/users.js'

export class InstructorsApi extends UsersApi {
  constructor() {
    super()
    this.resource = 'instructors'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  async featured() {
    return await this.http('GET', 'featured')
  }
}

const api = new InstructorsApi()

export default api
