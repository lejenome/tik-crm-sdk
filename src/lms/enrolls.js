import BaseApi from '../core/base.js'

export class EntollsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'enrolls'
    this.model_name = 'enroll'
    this.verbose_name = 'Enroll'
    this.verbose_name_plural = 'Enrolls'
    this.view_perm = 'enroll:view'
    this.add_perm = 'enroll:add'
    this.change_perm = 'enroll:change'
    this.delete_perm = 'enroll:delete'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  async registerOrder(
    course_id,
    provider,
    settings
    // { success_url, failure_url, coupon }
  ) {
    return await this.http('POST', `${course_id}/payment`, {
      provider,
      ...settings,
    })
  }

  async orderSuccess(course_id, order_id) {
    return await this.http('POST', `${course_id}/success`, {
      order_id,
    })
  }

  async orderFailure(course_id, order_id) {
    return await this.http('POST', `${course_id}/failure`, {
      order_id,
    })
  }

  new() {
    return {
      user_id: null,
      user: null,
      course_id: null,
      course: null,
      deposit: 0,
      paid: false,
      completed_lessons: '',
      order_id: null,
      is_active: true,
    }
  }

  toString(obj) {
    return obj.id ? obj.id.toString().padStart(8, '0') : ''
  }
}

const api = new EntollsApi()

export default api
