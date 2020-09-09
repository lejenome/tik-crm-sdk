import BaseApi from './base.js'
class StockApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'stock'
    this.configCache({ list: true }, 60 * 1000)
  }

  async report(assigned_at, suivi_id) {
    return this.http('GET', 'report', {
      assigned_at,
      suivi_id,
    })
  }

  async release(user_id, commands) {
    return this.http('POST', 'release', {
      staff_id: user_id,
      commands: commands.map((c) => c.id),
    })
  }
}

const stockApi = new StockApi()
export default stockApi
