import BaseApi from './base'
import {
  base_url,
  base_domain,
  saas_base_url,
  saas_base_domain,
  default as CONFIG,
} from '../config.js'

export class OrganizationApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'site'
    // this.configCache({ list: true }, 60 * 60 * 1000)
  }

  get base_domain() {
    return globalThis.tikSdkConfig.API_BASE_URL
      ? base_domain()
      : saas_base_domain()
  }

  get base_url() {
    return globalThis.tikSdkConfig.API_BASE_URL ? base_url() : saas_base_url()
  }

  toObj(object) {
    if (!object.attrs) {
      object.attrs = {}
    }
    if (!object.config_attrs) {
      object.config_attrs = {}
    }
    if (!object.permissions) {
      object.permissions = []
    }
    if (!object.payment_providers) {
      object.payment_providers = []
    }
    delete object.cover_file
    delete object.picture_file
    delete object.background_image_file

    const domains = {}
    const origins = {}
    for (const domain of object.domains) {
      domains[domain.type] = domain.domain
      origins[domain.type] = domain.origin
    }
    if (!domains.api) {
      domains.api = domains.admin
      origins.api = origins.admin
    }
    if (!domains.admin) {
      domains.admin = domains.api
      origins.admin = origins.api
    }
    if (!domains.cdn) {
      domains.cdn = domains.api
      origins.cdn = origins.api
    }

    object.$domains = domains
    object.$origins = origins

    const $base_url = new URL(object.$origins.api)
    object.http_protocol = ($base_url.protocol || 'https:') + '//'
    object.http_port = $base_url.port ? `:${$base_url.port}` : ''

    return object
  }

  async get_site(fetch_mode, domain) {
    let data
    if (!fetch_mode) {
      fetch_mode = CONFIG.FETCH_MODE
    }
    if (fetch_mode === 'API_BASE_URL') {
      data = await this.list()
    } else if (fetch_mode === 'REFERER') {
      data = await this.http('GET', 'hostname')
    } else if (fetch_mode === 'DOMAIN') {
      data = await this.http('GET', domain)
    }
    return this.toObj(data)
  }

  async get_site_by_domain(domain) {
    return await this.get_site('DOMAIN', domain)
  }

  async get_site_by_referer() {
    return await this.get_site('REFERER')
  }
}

const api = new OrganizationApi()
export default api
