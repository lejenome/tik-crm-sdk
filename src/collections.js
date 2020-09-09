import BaseApi from './base.js'
import productsApi from './products.js'
import $organization from './organization'

class CollectionsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'collections'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  new() {
    return {
      sku: '',
      title: '',
      description: '',
      delivery_id: null,
      suivi_id: null,
      items: [
        {
          product_id: null,
          name: '',
          price: 0,
          count: 0,
        },
      ],
      discount: 0,
      price_net: 0,
      thumbnail: '',
      is_active: true,
    }
  }

  itemPrice(item) {
    if (item.product_id) {
      if (item.product) {
        return productsApi.price(item.product, item.count)
      } else {
        // TODO
      }
    } else {
      return parseFloat(item.price)
    }
  }

  addItem(collection, product) {
    let item
    if (typeof product === 'object') {
      item = collection.items.find((it) => it.product_id === product.id)
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
        collection.items.push(item)
      }
    } else {
      item = {
        title: '',
        count: 0,
        price: 0,
        product_id: null,
        max_count: 0,
      }
      collection.items.push(item)
    }
    item.price = this.itemPrice(item)
    collection.price_net = this.price(collection)
  }

  changeItemProduct(collection, item, product) {
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
    collection.price_net = this.price(collection)
  }

  removeItem(collection, item) {
    collection.items.splice(collection.items.indexOf(item), 1)
    collection.price_net = this.price(collection)
  }

  price(collection) {
    const price =
      collection.items.reduce((s, it) => this.itemPrice(it) + s, 0) -
      parseFloat(collection.discount)
    return Math.round(price * 100) / 100
  }
}

const collectionsApi = new CollectionsApi()
export default collectionsApi
