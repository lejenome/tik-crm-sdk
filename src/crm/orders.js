import { CommandsApi } from './commands.js'

export class OrdersApi extends CommandsApi {
  constructor() {
    super()
    // this.resource = 'commands'
    this.model_name = 'order'
    this.verbose_name = 'Order'
    this.verbose_name_plural = 'Orders'
    this.view_perm = 'order:view'
    this.add_perm = 'order:add'
    this.change_perm = 'order:change'
    this.delete_perm = 'order:delete'
  }

  async registerOrder(order_id, provider, settings) {
    return await this.http('POST', `${order_id}/payment`, {
      variant: provider,
      ...settings,
    })
  }
}

const api = new OrdersApi()
export default api
