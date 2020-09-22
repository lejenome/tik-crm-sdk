import { register, hasRole } from './base'

// TODO: support all default permissions for all models (view, add, change/change, delete)

const ALL_ROLES = [
  'admin',
  'manager',
  'finance',
  'suivi',
  'commercial',
  'stock',
]
const ACTIVE_ROLES = ['admin', 'manager', 'finance', 'suivi', 'commercial']
const TOP_ADMINS = ['admin', 'manager']
const SUIVIS = ['admin', 'manager', 'finance', 'suivi']
const COMMERCIALS = ['admin', 'manager', 'finance', 'commercial']
const STOCK_TEAM = ['admin', 'manager', 'stock']
const POS_TEAM = ['admin', 'manager', 'pos']

/***************************************************/
/*          Client Model Permissions               */
/***************************************************/

register('client:view', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance'])
)

register('client:add', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance', 'commercial'])
)

register('client:delete', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

/***************************************************/
/*          Staff Model Permissions                */
/***************************************************/

register('staff:view', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance'])
)

register('staff:add', ($org, user, obj) => hasRole(user, ['admin', 'manager']))

register('staff:edit', ($org, user, obj) => hasRole(user, ['admin', 'manager']))

/***************************************************/
/*          Product Model Permissions              */
/***************************************************/

register('product:view', ($org, user, obj) => true)

register('product:add', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('product:edit', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('product:add-quantity', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

/***************************************************/
/*          Collection Model Permissions           */
/***************************************************/

register('collection:view', ($org, user, obj) => $org.hasModule('collections'))

register(
  'collection:add',
  ($org, user, obj) =>
    $org.hasModule('collections') && hasRole(user, ['admin', 'manager'])
)

register(
  'collection:edit',
  ($org, user, obj) =>
    $org.hasModule('collections') && hasRole(user, ['admin', 'manager'])
)

/***************************************************/
/*          Store Model Permissions                */
/***************************************************/

register('store:view', ($org, user, obj) => hasRole(user, ['admin', 'manager']))

register('store:add', ($org, user, obj) => hasRole(user, ['admin', 'manager']))

register('store:edit', ($org, user, obj) => hasRole(user, ['admin', 'manager']))

/***************************************************/
/*          DeliveryCompanies Model Permissions    */
/***************************************************/

register('delivery:view', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('delivery:add', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('delivery:edit', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)
