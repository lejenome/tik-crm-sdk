import BaseApi from '../core/base.js'

export class LessonsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'lessons'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }
}

const api = new LessonsApi()

export default api
