import BaseApi from '../core/base.js'

export class AttendeesApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'attendees'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  async registerOrder(
    webinar_id,
    provider,
    settings
    // { success_url, failure_url, coupon }
  ) {
    return await this.http('POST', `${webinar_id}/payment`, {
      provider,
      ...settings,
    })
  }

  async orderSuccess(webinar_id, order_id) {
    return await this.http('POST', `${webinar_id}/success`, {
      order_id,
    })
  }

  async orderFailure(webinar_id, order_id) {
    return await this.http('POST', `${webinar_id}/failure`, {
      order_id,
    })
  }
}

const api = new AttendeesApi()

export default api
