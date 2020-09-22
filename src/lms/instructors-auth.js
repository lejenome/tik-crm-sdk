import { AuthApi } from './core/auth'
import { config } from '../core/base.js'
import instructorsApi from './instructors'

class InstructorsAuthApi extends AuthApi {
  constructor() {
    super()
    this.ns = {
      me: 'instructor_me',
      token: 'instructor_token',
      authToken: 'instructorAuthToken',
    }
  }

  async fetchMe() {
    return await this.asInstructor(async () => await instructorsApi.me())
  }

  async asInstructor(fn) {
    let oldAuthToken = config.authToken
    try {
      config.authToken = config[this.ns.authToken]
      const res = await fn()
      config.authToken = oldAuthToken
      return res
    } catch (e) {
      config.authToken = oldAuthToken
      throw e
    }
  }
}

const api = new InstructorsAuthApi()
export default api
