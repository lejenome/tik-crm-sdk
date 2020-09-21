import BaseApi from '../core/base.js'

export class PostsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'posts'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }
}

const api = new PostsApi()

export default api
