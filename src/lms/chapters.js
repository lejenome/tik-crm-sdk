import BaseApi from '../core/base.js'

export class ChaptersApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'chapters'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }
}

const api = new ChaptersApi()

export default api
