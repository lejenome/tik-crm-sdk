export {
  setConfig,
  setConfigOrganization,
  base_url,
  base_domain,
  saas_base_url,
  saas_base_domain,
  default as config,
} from './config.js'
export { default as organization } from './organization.js'
import * as core from './core/index.js'
import * as crm from './crm/index.js'
import * as lms from './lms/index.js'
import * as cms from './cms/index.js'
import * as permissions from './permissions/index.js'
import * as saas from './saas/index.js'
export { core, crm, lms, cms, permissions, saas }
