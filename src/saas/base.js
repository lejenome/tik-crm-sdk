import BaseApi from '../base'

export const config = {
  authToken: null,
}

export function base_domain() {
  if (process.env.NODE_ENV !== 'production') {
    return process.env.SAAS_API_BASE_URL_DEV || process.env.SAAS_API_BASE_URL
  } else {
    return process.env.SAAS_API_BASE_URL
  }
}

export function base_url() {
  if (process.env.NODE_ENV !== 'production') {
    return (
      (process.env.SAAS_API_BASE_URL_DEV || process.env.SAAS_API_BASE_URL) +
      (process.env.API_PREFIX_DEV || process.env.API_PREFIX || '/api/')
    )
  } else {
    return process.env.SAAS_API_BASE_URL + (process.env.API_PREFIX || '/api/')
  }
}

class SaasBaseApi extends BaseApi {
  constructor() {
    super()
    this.base_domain = base_domain()
    this.base_url = base_url()
  }
}

export default SaasBaseApi
