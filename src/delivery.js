import BaseApi from './base.js'
class DeliveryCompaniesApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'delivery-companies'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  new() {
    return {
      id: '',
      type: 'aramex',
      attrs: {},
      name: '',
      done: 0,
      canceled: 0,
      phone: '',
      email: '',
      address: '',
      is_active: true,
    }
  }

  async rapport(query) {
    return this.http('GET', `rapport`, query)
  }

  async primary() {
    return (await this.list()).find((it) => it.is_primary)
  }

  types() {
    return [
      {
        ref: 'aramex',
        name: 'Aramex',
        color: 'rgb(228, 51, 51)',
        attrs: [
          { name: 'number', type: 'text', default: '' },
          { name: 'pin', type: 'password', default: '' },
          { name: 'entity', type: 'text', default: 'TUN' },
          { name: 'country_code', type: 'text', default: 'TN' },
        ],
      },
      {
        ref: 'fparcel',
        name: 'FParcel',
        color: 'rgb(23, 97, 39)',
        attrs: [],
      },
      {
        ref: '1delivery',
        name: 'First Delivery',
        color: 'rgb(0, 141, 76)',
        attrs: [],
      },
      {
        ref: 'tnexpress',
        name: 'Tunisia Express',
        color: 'rgb(0, 128, 255)',
        attrs: [
          { name: 'username', type: 'text', default: '' },
          { name: 'password', type: 'password', default: '' },
          { name: 'api_key', type: 'text', default: '' },
        ],
      },
    ]
  }

  status() {
    return [
      {
        name: 'new',
        displayName: 'Nouveaux',
        icon: 'fa fa-hourglass-half',
        backgroundColor: 'rgb(255,255,210)',
        color: 'black',
      },
      {
        name: 'created',
        displayName: 'Command Confirmée',
        icon: 'fa fa-shopping-cart',
        backgroundColor: 'rgb(246, 224, 108)',
        color: 'black',
      },
      {
        name: 'in_delivery_facility',
        displayName: 'En Depot',
        icon: 'fa fa-bank',
        backgroundColor: 'rgb(212, 137, 69)',
      },
      {
        name: 'out_for_delivery',
        displayName: 'En Cours',
        icon: 'fa fa-truck',
        backgroundColor: '#337ab7',
      },
      {
        name: 'returned_delivery_facility',
        displayName: 'Echec',
        icon: 'fa fa-warning',
        backgroundColor: 'rgb(255, 123, 123)',
      },
      {
        name: 'canceled',
        displayName: 'Annulé',
        icon: 'fa fa-times',
        backgroundColor: 'rgb(228, 51, 51)',
      },
      {
        name: 'delivered',
        displayName: 'Délivré',
        icon: 'fa fa-check',
        backgroundColor: 'rgb(137, 255, 88)',
      },
      {
        name: 'returned_shipper',
        displayName: 'Retourne Definitif',
        icon: 'fa fa-cubes',
        backgroundColor: 'black',
      },
      {
        name: 'paid',
        displayName: 'Payé',
        icon: 'fa fa-money',
        backgroundColor: 'rgb(32, 216, 223)',
      },
    ]
  }
}

const deliveryCompaniesApi = new DeliveryCompaniesApi()

export default deliveryCompaniesApi
