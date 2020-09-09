import BaseApi from './base.js'
class CategoriesApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'categories'
    this.configCache({ list: true }, 60 * 60 * 60 * 1000)
  }

  new() {
    return {
      id: '',
      title: '',
      thumbnail: undefined,
      is_active: true,
    }
  }
}

const categoriesApi = new CategoriesApi()

export default categoriesApi
