/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { register, hasRole } from './base'

// TODO: support all default permissions for all models (view, add, change/change, delete)

/***************************************************/
/*          Student Model Permissions              */
/***************************************************/

register('student:view', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance'])
)

register('student:add', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance', 'commercial'])
)

register('student:change', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance', 'commercial'])
)

register(
  'student:delete',
  ($org, user, obj) => hasRole(user, ['admin', 'manager']) && obj && obj.id
)

/***************************************************/
/*          Instructor Model Permissions           */
/***************************************************/

register('instructor:view', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance'])
)

register('instructor:add', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('instructor:change', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('instructor:delete', ($org, user, obj) => false)
