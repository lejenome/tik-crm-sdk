import BaseApi from '../core/base.js'

class StoresApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'stores'
    this.model_name = 'store'
    this.verbose_name = 'Store'
    this.verbose_name_pluarl = 'Stores'
    this.view_perm = 'store:view'
    this.add_perm = 'store:add'
    this.change_perm = 'store:change'
    this.delete_perm = 'store:delete'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  new() {
    return {
      id: '',
      title: '',
      thumbnail: undefined,
      phone: '',
      email: '',
      address: '',
      city: '',
      country: 'TN',
      state: 'Sfax',
      company_name: '',
      vat_number: '',
      postal_code: 3000,
      is_active: true,
    }
  }

  async primary() {
    return (await this.list()).find((it) => it.is_primary)
  }
}

const storesApi = new StoresApi()

export default storesApi
