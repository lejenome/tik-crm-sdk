import BaseApi from '../core/base.js'

export class WebinarsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'webinars'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  async join(id, username) {
    const res = await this.http('POST', `${id}/join`, {
      username,
    })
    return res.url
  }

  async get_default() {
    try {
      const res = await this.http('GET', 'default')
      return res
    } catch (e) {
      return null
    }
  }

  async create_default(name, attendees) {
    const res = await this.http('POST', 'default', {
      name,
      attendees,
    })
    return res
  }
}

const api = new WebinarsApi()

export default api
