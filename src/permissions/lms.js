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

/***************************************************/
/*          Enrolls Model Permissions              */
/***************************************************/

register('enroll:view', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance', 'instructor'])
)

register('enroll:add', ($org, user, obj) => hasRole(user, ['admin', 'manager']))

register('enroll:change', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('enroll:delete', ($org, user, obj) => false)

/***************************************************/
/*          Course Model Permissions               */
/***************************************************/

register('course:view', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'instructor'])
)

register('course:add', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'instructor'])
)

register('course:change', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'instructor'])
)

register('course:delete', ($org, user, obj) => false)

/***************************************************/
/*          Lesson Model Permissions               */
/***************************************************/

register('lesson:view', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'instructor'])
)

register('lesson:add', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'instructor'])
)

register('lesson:change', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'instructor'])
)

register('lesson:delete', ($org, user, obj) => false)

/***************************************************/
/*          Meeting Model Permissions              */
/***************************************************/

register('meeting:view', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'instructor'])
)

register('meeting:add', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'instructor'])
)

register('meeting:change', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'instructor'])
)

register('meeting:change-webinar', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)

register('meeting:delete', ($org, user, obj) => false)
