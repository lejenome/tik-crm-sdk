import BaseApi from '../core/base.js'

export class EntollsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'enrolls'
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
}

const api = new EntollsApi()

export default api
