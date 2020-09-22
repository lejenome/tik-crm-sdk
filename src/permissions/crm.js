import { register } from './base'

register('client:view', ($org, user, obj) =>
  ['admin', 'manager', 'finance'].includes(user.role)
)

register('client:delete', ($org, user, obj) =>
  ['admin', 'manager'].includes(user.role)
)

register('store:view', ($org, user, obj) =>
  ['admin', 'manager'].includes(user.role)
)

register('store:add', ($org, user, obj) =>
  ['admin', 'manager'].includes(user.role)
)

register('store:edit', ($org, user, obj) =>
  ['admin', 'manager'].includes(user.role)
)

register('delivery:view', ($org, user, obj) =>
  ['admin', 'manager'].includes(user.role)
)

register('delivery:add', ($org, user, obj) =>
  ['admin', 'manager'].includes(user.role)
)

register('product:edit', ($org, user, obj) =>
  ['admin', 'manager'].includes(user.role)
)

register('product:add', ($org, user, obj) =>
  ['admin', 'manager'].includes(user.role)
)

register('product:add-quantity', ($org, user, obj) =>
  ['admin', 'manager'].includes(user.role)
)

register(
  'collection:edit',
  ($org, user, obj) =>
    $org.hasModule('collections') && ['admin', 'manager'].includes(user.role)
)

register(
  'collection:add',
  ($org, user, obj) =>
    $org.hasModule('collections') && ['admin', 'manager'].includes(user.role)
)

register('staff:edit', ($org, user, obj) =>
  ['admin', 'manager'].includes(user.role)
)

register('staff:add', ($org, user, obj) =>
  ['admin', 'manager'].includes(user.role)
)
