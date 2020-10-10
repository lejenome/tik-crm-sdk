import { saas_base_url, saas_base_domain } from '../config.js'
import BaseApi from '../core/base.js'

if (!globalThis.tikSdkSaasSession) {
  globalThis.tikSdkSaasSession = {
    authToken: null,
  }
}

export const SaasApiMixin = (BaseApi) =>
  class extends BaseApi {
    get base_domain() {
      return saas_base_domain()
    }

    get base_url() {
      return saas_base_url()
    }

    get session() {
      return globalThis.tikSdkSaasSession
    }
  }

class SaasBaseApi extends SaasApiMixin(BaseApi) {}

export default SaasBaseApi
