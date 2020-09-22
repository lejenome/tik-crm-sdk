import { register } from './base'

register('dashboard:view-tags', ($org, user, obj) =>
  ['admin', 'manager', 'stock'].includes(user.role)
)

register('dashboard:edit-tags', ($org, user, obj) =>
  ['admin', 'manager', 'stock'].includes(user.role)
)

register('command:view', ($org, user, obj) =>
  ['admin', 'manager', 'finance'].includes(user.role)
)

register(
  'dashboard:view',
  ($org, user, obj) =>
    $org.hasModule('commands') &&
    (['admin', 'manager', 'finance', 'suivi', 'stock'].includes(user.role) ||
      user.is_freelance)
)

register('dashboard:filter', ($org, user, obj) =>
  ['admin', 'manager', 'finance'].includes(user.role)
)

register('dashboard:view-products-chart', ($org, user, obj) =>
  ['admin', 'manager', 'finance', 'stock'].includes(user.role)
)

register('dashboard:filter-stock-suivi', ($org, user, obj) =>
  ['admin', 'manager'].includes(user.role)
)
