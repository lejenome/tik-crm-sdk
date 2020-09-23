import BaseApi from '../core/base.js'
import categoriesApi from './categories.js'

class ProductsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'products'
    this.model_name = 'product'
    this.verbose_name = 'Product'
    this.verbose_name_pluarl = 'Products'
    this.view_perm = 'product:view'
    this.add_perm = 'product:add'
    this.change_perm = 'product:change'
    this.delete_perm = 'product:delete'
    this.lookup_field = 'sku'
    this.configCache({ list: true }, 15 * 1000)
  }

  new() {
    return {
      title: '',
      count: 0,
      sku: '',
      // status: "In Stock",
      category_id: null,
      category_title: '',
      is_active: true,
      saleoffers: [],
      price_net: 0,
      tax_rate: 19,
      cost_price: 0,
      has_variants: false,
      is_shipping_required: true,
      is_digital: false,
      charge_taxes: true,
      charge_shipping: false,
      // weight:,
    }
  }

  async addStock(p, count) {
    return this.http('POST', `${p.sku}/stock`, { count })
  }

  async rapport(query) {
    return this.http('GET', `rapport`, query)
  }

  async categories() {
    return categoriesApi.list()
  }

  defaultPrice(product) {
    return parseFloat(product.price_net) * (1 + product.tax_rate / 100)
  }

  offerPrice(price, count, offer) {
    price = parseFloat(price)
    if (offer.discount_type === '%' && offer.discount_percentage) {
      price = parseFloat(price) * (1 - offer.discount_percentage / 100)
    } else if (offer.discount_type === 'n' && offer.discount_amount) {
      price = parseFloat(price) - parseFloat(offer.discount_amount)
    }
    return price * count
  }

  offer(product, count) {
    let offer = { count_min: 0, discount_percentage: 0 }
    if (product.saleoffers) {
      offer = product.saleoffers.reduce(
        (cp, p) =>
          p.count_min <= count && p.count_min >= cp.count_min ? p : cp,
        offer
      )
    }
    return offer
  }

  price(product, count) {
    const price = this.defaultPrice(product)
    const offer = this.offer(product, count)
    return this.offerPrice(price, count, offer)
  }

  stockColor(product) {
    if (product.count < 300) {
      return '#dd4b39'
    } else if (product.count < 500) {
      return '#f39c12'
    } else {
      return '#00a65a'
    }
  }

  status() {
    return [
      {
        name: 'stock',
        displayName: 'Stock',
        icon: 'fa fa-cubes',
        backgroundColor: 'rgb(137, 255, 88)',
      },
      {
        name: 'new',
        displayName: 'Nouveaux',
        icon: 'fa fa-shopping-cart',
        backgroundColor: '#f6e06c',
      },
      {
        name: 'scheduled',
        displayName: 'Réservés',
        icon: 'fa fa-hourglass-half',
        backgroundColor: 'rgb(255, 255, 210)',
        color: 'white',
      },
      {
        name: 'inprogress',
        displayName: 'En Cours',
        icon: 'fa fa-truck',
        backgroundColor: '#337ab7',
      },
      {
        name: 'done',
        displayName: 'Délivrés',
        icon: 'fa fa-check',
        backgroundColor: '#89ff58',
      },

      {
        name: 'canceled',
        displayName: 'Annulés',
        icon: 'fa fa-times',
        backgroundColor: '#ff7b7b',
      },

      {
        name: 'paid',
        displayName: 'Payés',
        icon: 'fa fa-money',
        backgroundColor: 'rgb(32, 216, 223)',
      },
      {
        name: 'returned',
        displayName: 'Retourne Dépot',
        icon: 'fa fa-cubes',
        backgroundColor: '#000000',
        color: 'white',
      },
      {
        name: 'released',
        displayName: 'Libérés',
        icon: 'fa fa-truck',
        backgroundColor: '#131654',
      },
    ]
  }
}

const productsApi = new ProductsApi()
export default productsApi
