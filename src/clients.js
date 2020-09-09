import BaseApi from './base.js'
class ClientsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'clients'
    this.configCache({ list: true }, 5 * 60 * 1000)
  }

  new() {
    return {
      full_name: '',
      first_name: '',
      last_name: '',
      attrs: {
        type: 'detail',
        facebook_url: '',
      },
      phone: '',
      address: '',
      country: 'TN',
      state: 'Sfax',
      postal_code: '',
      email: '',
      company_name: '',
      vat_number: '',
    }
  }

  toObj(o) {
    if (!o.attrs) {
      o.attrs = {}
    }
    Object.defineProperties(o, {
      type: {
        get() {
          return this.attrs.type
        },
        set(val) {
          this.attrs.type = val
        },
      },
    })
    return o
  }

  typeAchat() {
    return ['gros', 'detail']
  }

  states() {
    return [
      'Ariana',
      'Beja',
      'Ben Arous',
      'Bizerte',
      'Gabes',
      'Gafsa',
      'Jendouba',
      'Kairouan',
      'Kasserine',
      'Kebili',
      'Kef',
      'Mahdia',
      'Mannouba',
      'Medenine',
      'Monastir',
      'Nabeul',
      'Sfax',
      'Sidi Bouzid',
      'Siliana',
      'Sousse',
      'Tataouine',
      'Tozeur',
      'Tunis',
      'Zaghouan',
    ]
  }

  async rapport(id) {
    return this.http('GET', id + '/rapport')
  }

  async history(id) {
    return this.http('GET', id + '/history')
  }
}

const clientsApi = new ClientsApi()
export default clientsApi
