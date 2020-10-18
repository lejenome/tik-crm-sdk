import BaseApi from '../core/base.js'

import deliveryCompaniesApi from './delivery.js'
import storesApi from './stores.js'
import productsApi from './products.js'
import $organization from '../organization'

export class CommandsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'commands'
    this.model_name = 'command'
    this.verbose_name = 'Command'
    this.verbose_name_plural = 'Commands'
    this.view_perm = 'command:view'
    this.add_perm = 'command:add'
    this.change_perm = 'command:change'
    this.delete_perm = 'command:delete'
    this.configCache({ list: true }, 60 * 1000)
  }

  async new() {
    return {
      client_id: null,
      client_attrs: {
        full_name: '',
        phone: '',
        address: '',
        country: 'TN',
        state: '',
        city: '',
        postal_code: '',
      },
      type: 'delivery',
      delivery_id: ((await deliveryCompaniesApi.primary()) || {}).id,
      store_id: ((await storesApi.primary()) || {}).id,
      store_name: ((await storesApi.primary()) || {}).title,
      commercial_id: null,
      suivi_id: null,
      status: 'new',
      customer_note: '',
      staff_notes: [],
      items: [
        {
          product_id: null,
          title: '',
          price: 0,
          count: 0,
        },
      ],
      discount: 0,
      total: 0,
    }
  }

  toString(obj) {
    return obj.id ? obj.id.toString().padStart(8, '0') : ''
  }

  setClient(command, client) {
    if (client) {
      command.client_id = client.id
      command.client_attrs.phone = client.phone
      command.client_attrs.full_name = client.full_name
      command.client_attrs.address = client.address
      command.client_attrs.country = client.country
      command.client_attrs.state = client.state
      command.client_attrs.postal_code = client.postal_code
    } else {
      command.client_id = null
      command.client_attrs = {}
    }
  }

  itemPrice(item) {
    if (item.product_id) {
      if (item.product) {
        return productsApi.price(item.product, item.count)
      } else {
        // FIXME
        return parseFloat(item.price)
      }
    } else {
      return parseFloat(item.price)
    }
  }

  addItem(command, product) {
    let item
    if (typeof product === 'object') {
      item = command.items.find((it) => it.product_id === product.id)
      if (item) {
        item.count++
      } else {
        item = {
          title: product.title,
          count: 1,
          // price: product.price,
          product_id: product.id,
          max_count: product.count,
          product,
        }
        command.items.push(item)
      }
    } else {
      item = {
        title: '',
        count: 0,
        price: 0,
        product_id: null,
        max_count: 0,
      }
      command.items.push(item)
    }
    item.price = this.itemPrice(item)
    command.total = this.price(command)
  }

  changeItemProduct(command, item, product) {
    if (typeof product === 'string') {
      item.product_id = null
      item.product = null
      item.title = product
      item.max_count = 4294967295
    } else {
      item.product_id = product.id
      item.product = product
      item.title = product.title
      item.max_count = product.count || 4294967295
    }
    item.price = 0
    item.count = 1
    item.price = this.itemPrice(item)
    command.total = this.price(command)
  }

  removeItem(command, item) {
    command.items.splice(command.items.indexOf(item), 1)
    command.total = this.price(command)
  }

  price(command) {
    const price =
      command.items.reduce((s, it) => this.itemPrice(it) + s, 0) -
      parseFloat(command.discount || 0)
    return Math.round(price * 100) / 100
  }

  totalHT(cmd) {
    if ($organization.tax_rate) {
      return (
        (parseFloat(cmd.total) + parseFloat(cmd.discount || 0)) /
        (1 + parseFloat($organization.tax_rate) / 100)
      )
    } else {
      return parseFloat(cmd.total) + parseFloat(cmd.discount || 0)
    }
  }

  tva(cmd) {
    if ($organization.tax_rate) {
      return (
        (parseFloat(cmd.total) /
          (1 + parseFloat($organization.tax_rate) / 100)) *
        (parseFloat($organization.tax_rate) / 100)
      )
    } else {
      return 0 // parseFloat(cmd.total)
    }
  }

  ttc(command) {
    return parseFloat(command.total) + parseFloat($organization.tax_stamp || 0)
  }

  async rapport(query) {
    return this.http('GET', 'rapport', query)
  }

  async deliver(cmd, shipment_id = null) {
    if (shipment_id) {
      return this.http('POST', `${cmd.id}/deliver`, {
        command_id: cmd.id,
        shipment_id,
      })
    } else {
      return this.http('POST', `${cmd.id}/deliver`)
    }
  }

  async track(cmd) {
    return this.http('POST', `${cmd.id}/track`)
  }

  async shipment(cmd) {
    return this.http('GET', `${cmd.id}/deliver`)
  }

  async assign(user_id, commands) {
    return this.http('POST', 'assign', {
      staff_id: user_id,
      commands: commands.map((c) => c.id),
    })
  }

  async makeNew(user_id, commands) {
    return this.http('POST', 'new', {
      staff_id: user_id,
      commands: commands.map((c) => c.id),
    })
  }

  async cash(user_id, commands) {
    return this.http('POST', 'cash', {
      staff_id: user_id,
      commands: commands.map((c) => c.id),
    })
  }

  async paid(user_id, commands) {
    return this.http('POST', 'paid', {
      staff_id: user_id,
      commands: commands.map((c) => c.id),
    })
  }

  async returned(user_id, commands) {
    return this.http('POST', 'returned', {
      staff_id: user_id,
      commands: commands.map((c) => c.id),
    })
  }

  commandTypes() {
    return ['direct', 'delivery']
  }

  commandStatus() {
    return [
      'new',
      'scheduled',
      'inprogress',
      'done',
      'canceled',
      'returned',
      'cash',
      'paid',
    ]
  }

  /*
  async postCreate(command) {
    for (const item of command.items) {
      if (item.product_id) {
        const p = await productsApi.get(item.product_id);
        p.count -= item.count;
        await productsApi.save(p);
      }
    }
  }
  async postUpdate(oldC, newC) {
    if (oldC.status !== 'canceled' && newC.status === 'canceled') {
      for (const item of newC.items) {
        if (item.product_id) {
          const p = await productsApi.get(item.product_id);
          p.count += item.count;
          await productsApi.save(p);
        }
      }
    }
  }
  */
  status() {
    return [
      {
        name: 'new',
        displayName: 'Nouveaux',
        icon: 'fa fa-shopping-cart',
        backgroundColor: '#f6e06c',
        date: 'created_at',
      },
      {
        name: 'scheduled',
        displayName: 'Réservés',
        icon: 'fa fa-hourglass-half',
        backgroundColor: 'rgb(255, 255, 210)',
        date: 'scheduled_at',
      },
      {
        name: 'inprogress',
        displayName: 'En Cours',
        icon: 'fa fa-truck',
        backgroundColor: '#337ab7',
        date: 'assigned_at',
      },
      {
        name: 'done',
        displayName: 'Délivrés',
        icon: 'fa fa-check',
        backgroundColor: '#89ff58',
        date: 'completed_at',
      },

      {
        name: 'canceled',
        displayName: 'Annulés',
        icon: 'fa fa-times',
        backgroundColor: '#ff7b7b',
        date: 'completed_at',
      },

      {
        name: 'cash',
        displayName: 'Encaisés',
        icon: 'fa fa-bank',
        backgroundColor: '#e6e6e6',
        date: 'cash_at',
      },
      {
        name: 'paid',
        displayName: 'Payés',
        icon: 'fa fa-money',
        backgroundColor: 'rgb(32, 216, 223)',
        date: 'paid_at',
      },
      {
        name: 'returned',
        displayName: 'Retourne Dépot',
        icon: 'fa fa-cubes',
        backgroundColor: '#000000',
        color: 'white',
        date: 'paid_at',
        dark: true,
      },
    ]
  }
}

const api = new CommandsApi()
export default api
