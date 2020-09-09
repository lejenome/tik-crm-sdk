import BaseApi from './base'

export class SubscriptionsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'organizations/subscriptions'
    // this.configCache({ list: true }, 60 * 60 * 1000)
  }

  async registerOrder(
    subscription_id,
    provider,
    settings
    // { success_url, failure_url, coupon }
  ) {
    return await this.http('POST', `${subscription_id}/payment`, {
      provider,
      ...settings,
    })
  }

  async orderSuccess(subscription_id, order_id) {
    return await this.http('POST', `${subscription_id}/success`, {
      order_id,
    })
  }

  async orderFailure(subscription_id, order_id) {
    return await this.http('POST', `${subscription_id}/failure`, {
      order_id,
    })
  }
}

const api = new SubscriptionsApi()

export default api
