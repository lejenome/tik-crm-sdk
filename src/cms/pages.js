import BaseApi from '../core/base.js'
import newslettersApi from './newsletters'

export class PagesApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'pages'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }
}

const api = new PagesApi()

export default api
