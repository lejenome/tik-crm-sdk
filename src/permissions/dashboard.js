import { register, hasRole } from './base'

register('dashboard:view-tags', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'stock'])
)

register('dashboard:edit-tags', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'stock'])
)

register(
  'dashboard:view',
  ($org, user, obj) =>
    $org.hasModule('commands') &&
    hasRole(user, [
      'admin',
      'manager',
      'finance',
      'suivi',
      'stock',
      'freelance',
    ])
)

register('dashboard:filter', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance'])
)

register('dashboard:view-products-chart', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance', 'stock'])
)

register('dashboard:filter-stock-suivi', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager'])
)
