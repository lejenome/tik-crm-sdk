// import BaseApi from './base'
import { SaasApiMixin } from './base'
import { OrganizationApi as TenantOrganizationApi } from '../core/organization'

// export class OrganizationsApi extends BaseApi {
export class OrganizationsApi extends SaasApiMixin(TenantOrganizationApi) {
  constructor() {
    super()
    this.resource = 'organizations'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  /*
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
    return object
  }
  */

  async subscribe(id, plan_id) {
    const res = await this.http('POST', `${id}/subscribe`, {
      plan_id,
    })
    return res
  }
}

const api = new OrganizationsApi()

export default api
