import BaseApi from '../core/base'

export class NewslettersApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'subscriptions'
  }

  async subscribe(subscription, newsletter) {
    console.log('Subscripton', subscription.email)
    await this.save({
      subject: newsletter || process.env.NEWSLETTER_DEFAULT_SUBJECT,
      full_name: subscription.full_name || 'utilisateur',
      email: subscription.email,
    })
  }
}

const newslettersApi = new NewslettersApi()
export default newslettersApi
