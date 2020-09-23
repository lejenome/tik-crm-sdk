import BaseApi from '../core/base.js'

class ClientsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'clients'
    this.model_name = 'client'
    this.verbose_name = 'Client'
    this.verbose_name_plural = 'Clients'
    this.view_perm = 'client:view'
    this.add_perm = 'client:add'
    this.change_perm = 'client:change'
    this.delete_perm = 'client:delete'
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

  toString(obj) {
    return `${obj.first_name || ''} ${obj.last_name || ''}`
  }

  async rapport(id) {
    return this.http('GET', id + '/rapport')
  }

  async history(id) {
    return this.http('GET', id + '/history')
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
}

const clientsApi = new ClientsApi()
export default clientsApi
