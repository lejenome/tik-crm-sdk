import { saas_base_url, saas_base_domain } from '../config.js'
import BaseApi from '../core/base.js'

export const session = {
  authToken: null,
}

class SaasBaseApi extends BaseApi {
  get base_domain() {
    return saas_base_domain()
  }

  get base_url() {
    return saas_base_url()
  }
  get session() {
    return session
  }
}

export default SaasBaseApi
