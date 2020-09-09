import BaseApi from './base'

export class OffersApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'offers'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }
}

const api = new OffersApi()

export default api
