import BaseApi from './base.js'
class StoresApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'stores'
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
