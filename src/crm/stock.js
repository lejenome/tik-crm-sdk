import BaseApi from '../core/base.js'

class StockApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'stock'
    this.model_name = 'stock'
    this.verbose_name = 'Stock'
    this.verbose_name_plural = 'Stock'
    this.view_perm = 'stock:view'
    this.add_perm = 'stock:add'
    this.change_perm = 'stock:change'
    this.delete_perm = 'stock:delete'
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

  toString(obj) {
    return obj.id ? obj.id.toString().padStart(8, '0') : ''
  }
}

const stockApi = new StockApi()
export default stockApi
