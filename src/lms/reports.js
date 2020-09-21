import BaseApi from '../core/base.js'

export class ReportsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'reports'
  }

  async course(id) {
    return await this.http('GET', `courses/${id}`)
  }
}

const api = new ReportsApi()

export default api
