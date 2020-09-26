import BaseApi from '../core/base.js'

class CategoriesApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'course-categories'
    this.model_name = 'course-category'
    this.verbose_name = 'Course Category'
    this.verbose_name_plural = 'Course Categories'
    this.view_perm = 'course-category:view'
    this.add_perm = 'course-category:add'
    this.change_perm = 'course-category:change'
    this.delete_perm = 'course-category:delete'
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
