import BaseApi from '../core/base.js'

export class QuizsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'quizs'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }
}

const api = new QuizsApi()

export default api
