import {
  default as organizationApi,
  OrganizationApi,
} from './core/organization'

export class Organization {
  constructor(data) {
    if (data) {
      this.apply(data)
    }
  }

  async refresh(fetch_mode, domain) {
    const data = await organizationApi.get_site(fetch_mode, domain)
    if (data) {
      this.apply(data)
    }
  }

  async refresh_by_api_base_url() {
    await this.refresh('API_BASE_URL')
  }

  async refresh_by_domain(domain) {
    await this.refresh('DOMAIN', domain)
  }

  async refresh_by_referer() {
    await this.refresh('REFERER')
  }

  apply(data) {
    data = organizationApi.toObj(data)
    this.data = data
    this.domains = data.$domains
    this.origins = data.$origins
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
    ctxt.summary = this.data.summary
    ctxt.about_us = this.data.summary
    ctxt.about_us_fr = this.data.summary
    ctxt.facebook_url = this.data.facebook_url
    ctxt.fb_url = this.data.facebook_url
    ctxt.twitter_url = this.data.twitter_url
    ctxt.youtube_url = this.data.youtube_url
    ctxt.instagram_url = this.data.instagram_url
    ctxt.linkedin_url = this.data.linkedin_url
    ctxt.wiretransfer = this.data.wiretransfer
    ctxt.mandat = this.data.mandat
    ctxt.payment_providers = this.data.payment_providers
    ctxt.attrs = this.data.attrs
    ctxt.config_attrs = this.data.config_attrs
    ctxt.permissions = this.data.permissions
    ctxt.default_currency = this.data.default_currency
    ctxt.tax_rate = this.data.tax_rate
    ctxt.tax_stamp = this.data.tax_stamp
    ctxt.api_prefix = process.env.API_PREFIX || '/api/'
    ctxt.maintenance_mode =
      this.data.maintenance_mode || process.env.MAINTENANCE_MODE
    ctxt.maintenance_token =
      this.data.maintenance_token || process.env.MAINTENANCE_TOKEN
    ctxt.api_base_url = this.data.$origins.api
    if (this.data.$origins.webapp) {
      ctxt.base_url = this.data.$origins.webapp
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
    if (path && path.startsWith('/')) return `${this.data.$origins.cdn}${path}`
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

export { organizationApi, OrganizationApi }
export default $organization
