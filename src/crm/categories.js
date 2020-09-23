import BaseApi from '../core/base.js'

class CategoriesApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'categories'
    this.model_name = 'category'
    this.verbose_name = 'Category'
    this.verbose_name_plural = 'Categories'
    this.view_perm = 'category:view'
    this.add_perm = 'category:add'
    this.change_perm = 'category:change'
    this.delete_perm = 'category:delete'
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
