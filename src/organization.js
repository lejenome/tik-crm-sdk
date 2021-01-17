import BaseApi from './core/base'
import {
  base_url,
  base_domain,
  saas_base_url,
  saas_base_domain,
} from './config.js'

class OrganizationApi extends BaseApi {
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
    if (!object.payment_providers) {
      object.payment_providers = []
    }
    object._phone = object.phone
    delete object.cover_file
    delete object.picture_file
    delete object.background_image_file
    return object
  }

  async get() {
    const obj = await this.list()
    return this.toObj(obj)
  }

  async get_by_domain(domain) {
    const obj = await this.http('GET', domain)
    return this.toObj(obj)
  }

  async get_by_referer() {
    const obj = await this.http('GET', 'hostname')
    return this.toObj(obj)
  }
}

export const organizationApi = new OrganizationApi()

export class Organization {
  constructor(data) {
    if (data) {
      this.apply(data)
    }
  }

  async refresh() {
    const data = await organizationApi.get()
    if (data) {
      this.apply(data)
    }
  }

  async refresh_by_domain(domain) {
    const data = await organizationApi.get_by_domain(domain)
    if (data) {
      this.apply(data)
    }
  }

  async refresh_by_referer() {
    const data = await organizationApi.get_by_referer()
    if (data) {
      this.apply(data)
    }
  }

  apply(data) {
    this.data = data
    const domains = {}
    const origins = {}
    for (const domain of data.domains) {
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

    this.domains = domains
    this.origins = origins

    const $base_url = new URL(this.origins.api)
    this.http_protocol = ($base_url.protocol || 'https:') + '//'
    this.http_port = $base_url.port ? `:${$base_url.port}` : ''

    this.env(this)
  }

  html2txt(html) {
    if (html) {
      return html.replace(/<[^>]+>/g, '')
    } else {
      return ''
    }
  }

  env(ctxt) {
    if (!ctxt) {
      ctxt = {}
    }
    ctxt.hide_website = !!(this.data.hide_website || process.env.HIDE_WEBSITE)
    ctxt.modules = (this.data.modules || process.env.MODULES || '').split(',')
    ctxt.installed_apps = (
      this.data.installed_apps ||
      process.env.INSTALLED_APPS ||
      ''
    ).split(',')
    ctxt.delivery_backends = (
      this.data.delivery_backends ||
      process.env.DELIVERY_BACKENDS ||
      ''
    ).split(',')
    ctxt.description = this.data.description || ''
    ctxt.description_txt =
      this.data.description_txt || this.html2txt(this.data.description) || ''
    ctxt.display_name = this.data.display_name || this.data.name
    ctxt.short_name = this.data.name
    ctxt.cover = this.static(this.data.cover)
    ctxt.picture = this.static(this.data.picture)
    ctxt.favicon = this.static(this.data.favicon)
    ctxt.logo = this.static(this.data.picture)
    ctxt.background_image = this.static(this.data.background_image)
    ctxt.email = this.data.email
    ctxt.location = this.data.location
    ctxt.phone = this.data.phone
    ctxt.slug = this.data.slug
    ctxt.cache_prefix = this.data.slug
    ctxt.about_us = this.data.summary
    ctxt.about_us_fr = this.data.summary
    ctxt.fb_url = this.data.facebook_url
    ctxt.twitter_url = this.data.twitter_url
    ctxt.youtube_url = this.data.youtube_url
    ctxt.instagram_url = this.data.instagram_url
    ctxt.linkedin_url = this.data.linkedin_url
    ctxt.wiretransfer = this.data.wiretransfer
    ctxt.mandat = this.data.mandat
    ctxt.payment_providers = this.data.payment_providers
    ctxt.default_currency = this.data.default_currency
    ctxt.tax_rate = this.data.tax_rate
    ctxt.tax_stamp = this.data.tax_stamp
    ctxt.api_prefix = process.env.API_PREFIX || '/api/'
    ctxt.maintenance_mode =
      this.data.maintenance_mode || process.env.MAINTENANCE_MODE
    ctxt.maintenance_token =
      this.data.maintenance_token || process.env.MAINTENANCE_TOKEN
    ctxt.api_base_url = this.origins.api
    if (this.origins.webapp) {
      ctxt.base_url = this.origins.webapp
    } else {
      ctxt.base_url = process.env.BASE_URL
    }

    ctxt.piwik_site_id = this.data.piwik_site_id || process.env.PIWIK_SITE_ID
    ctxt.fb_pixel_id = this.data.fb_pixel_id || process.env.FB_PIXEL_ID
    ctxt.fb_page_id = this.data.fb_page_id || process.env.FB_PAGE_ID
    ctxt.fb_app_id = this.data.fb_app_id
    ctxt.google_analytics_id =
      this.data.google_analytics_id || process.env.GOOGLE_ANALYTICS_ID
    ctxt.google_gtag_id = this.data.google_gtag_id || process.env.GOOGLE_GTAG_ID
    ctxt.locales = (process.env.LOCALES || 'en-US,fr-FR').split(',')
    ctxt.default_locale = this.data.default_locale
    ctxt.newsletter_default_subject = 'default'
    return ctxt
  }

  ENV(ctxt) {
    if (!ctxt) {
      ctxt = {}
    }
    function value(val) {
      return val === null || val === undefined ? '' : val
    }
    const $env = this.env()
    for (const envar of Object.keys($env)) {
      const val = value($env[envar])
      if (Array.isArray(val)) {
        ctxt[envar.toUpperCase()] = val.join(',')
      } else if (val && typeof val === 'object') {
        for (const k of Object.keys(val)) {
          const v = value(val[k])
          ctxt[`${envar}_${k}`.toUpperCase()] = v
        }
      } else {
        ctxt[envar.toUpperCase()] = val
      }
    }
    return ctxt
  }

  static(path) {
    if (path && path.startsWith('/')) return `${this.origins.cdn}${path}`
    else return path
  }
  hasModule(md) {
    return this.modules.includes(md)
  }
  hasDeliveryBackend(md) {
    return this.delivery_backends.includes(md)
  }
}

if (!globalThis.TikSdkOrganization) {
  globalThis.TikSdkOrganization = new Organization()
}
const $organization = globalThis.TikSdkOrganization
export default $organization
