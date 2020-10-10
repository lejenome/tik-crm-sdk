import { SaasApiMixin } from './base'
import { UsersApi as TenantUsersApi } from '../core/users.js'

export class UsersApi extends SaasApiMixin(TenantUsersApi) {}

const api = new UsersApi()
export default api
