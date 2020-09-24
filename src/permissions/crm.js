/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { register, hasRole } from './base'

// TODO: support all default permissions for all models (view, add, change/change, delete)

/***************************************************/
/*          Client Model Permissions               */
/***************************************************/

register('client:view', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance'])
)

register('client:add', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance', 'commercial'])
)

register('client:change', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance', 'commercial'])
)

register(
  'client:delete',
  ($org, user, obj) => hasRole(user, ['admin', 'manager']) && obj && obj.id
)

/***************************************************/
/*          Staff Model Permissions                */
/***************************************************/

register('staff:view', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance'])
)

register('staff:add', ($org, user, obj) => hasRole(user, ['admin', 'manager']))

register('staff:change', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('staff:delete', ($org, user, obj) => false)

/***************************************************/
/*          Product Model Permissions              */
/***************************************************/

register('product:view', ($org, user, obj) => true)

register('product:add', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('product:change', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('product:delete', ($org, user, obj) => false)

register(
  'product:add-quantity',
  ($org, user, obj) => hasRole(user, ['admin', 'manager']) && obj && obj.id
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
  'collection:change',
  ($org, user, obj) =>
    $org.hasModule('collections') && hasRole(user, ['admin', 'manager'])
)

register('collection:delete', ($org, user, obj) => false)

/***************************************************/
/*          Store Model Permissions                */
/***************************************************/

register('store:view', ($org, user, obj) => hasRole(user, ['admin', 'manager']))

register('store:add', ($org, user, obj) => hasRole(user, ['admin', 'manager']))

register('store:change', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('store:delete', ($org, user, obj) => false)

/***************************************************/
/*          DeliveryCompanies Model Permissions    */
/***************************************************/

register('delivery:view', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('delivery:add', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('delivery:change', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('delivery:delete', ($org, user, obj) => false)
