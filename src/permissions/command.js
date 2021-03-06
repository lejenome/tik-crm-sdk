/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { register, hasRole } from './base'

register('command:view', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance'])
)

register('command:add', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance', 'commercial'])
)

register('command:change', ($org, user, obj) => false)

register(
  'command:delete',
  ($org, user, obj) => hasRole(user, ['admin', 'manager']) && obj && obj.id
)

register(
  'command:assign',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'suivi', 'manager', 'finance']) &&
    (!obj || ['scheduled', 'new'].includes(obj.status))
)

register(
  'command:mark-new',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'manager', 'finance', 'commercial']) &&
    (!obj || obj.status === 'scheduled')
)

register(
  'command:mark-done',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'manager', 'finance', 'suivi']) &&
    (!obj || obj.status === 'inprogress')
)

register(
  'command:mark-canceled',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'manager', 'finance', 'suivi']) &&
    (!obj || obj.status === 'inprogress')
)

register(
  'command:mark-returned',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'manager', 'finance', 'suivi', 'stock']) &&
    (!obj || ['canceled', 'inprogress'].includes(obj.status))
)

register(
  'command:mark-cash',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'manager', 'finance']) &&
    (!obj || ['done', 'inprogress'].includes(obj.status))
)

register(
  'command:mark-paid',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'manager', 'finance']) &&
    (!obj || ['cash', 'inprogress'].includes(obj.status))
)

register(
  'command:print-quote',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'manager', 'finance', 'stock', 'suivi']) &&
    (!obj ||
      (obj.id && ['inprogress', 'done', 'canceled'].includes(obj.status)))
)

register(
  'command:print-aramex-label',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'manager', 'finance', 'stock']) &&
    $org.hasDeliveryBackend('aramex') &&
    ['aramex'].includes(obj.delivery_type) &&
    ['inprogress', 'done', 'cash', 'paid'].includes(obj.status)
)

register(
  'command:print-fparcel-label',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'manager', 'finance', 'stock']) &&
    $org.hasDeliveryBackend('fparcel') &&
    ['fparcel'].includes(obj.delivery_type) &&
    ['inprogress', 'done', 'cash', 'paid'].includes(obj.status)
)

register(
  'command:export-fparcel',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'manager', 'finance', 'stock']) &&
    $org.hasDeliveryBackend('fparcel') &&
    (!obj ||
      (['fparcel'].includes(obj.delivery_type) &&
        ['inprogress'].includes(obj.status)))
)

register(
  'command:export',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'manager', 'finance', 'stock']) &&
    $org.hasModule('export') &&
    (!obj || ['inprogress'].includes(obj.status))
)

register(
  'command:view-history',
  ($org, user, obj) => obj.id && hasRole(user, ['admin', 'manager', 'finance'])
)

register(
  'command:turnback-inprogress',
  ($org, user, obj) =>
    obj &&
    obj.type === 'delivery' &&
    ['done', 'canceled'].includes(obj.status) &&
    hasRole(user, ['admin', 'manager'])
)

register(
  'command:view-shipment',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'suivi', 'manager', 'finance']) &&
    $org.hasDeliveryBackend(obj.delivery_type) &&
    ['inprogress', 'done', 'cash', 'paid', 'returned'].includes(obj.status)
)

register(
  'command:create-shipment',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'suivi', 'manager', 'finance']) &&
    $org.hasDeliveryBackend(obj.delivery_type) &&
    ['new'].includes(obj.status)
)

register(
  'command:assign-shipment',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'manager', 'finance']) &&
    $org.hasDeliveryBackend(obj.delivery_type) &&
    ['aramex'].includes(obj.delivery_id) &&
    !obj.shipment &&
    ['inprogress'].includes(obj.status)
)

register('command:mass-assign-shipment', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'finance'])
)

register(
  'command:track-shipment',
  ($org, user, obj) =>
    hasRole(user, ['admin', 'manager', 'finance']) &&
    $org.hasDeliveryBackend(obj.delivery_type) &&
    obj.shipment &&
    obj.shipment.shipment_id &&
    ['inprogress', 'done', 'cash'].includes(obj.status)
)

register(
  'command:view-cash',
  ($org, user, obj) => hasRole(user, ['admin']) && obj.status === 'done'
)

register(
  'command:view-paid',
  ($org, user, obj) =>
    hasRole(user, ['admin']) && ['cash', 'paid'].includes(obj.status)
)

register(
  'command:view-returned',
  ($org, user, obj) =>
    hasRole(user, ['admin']) && ['canceled', 'returned'].includes(obj.status)
)

register('command:mark-released', ($org, user, obj) =>
  hasRole(user, ['admin', 'manager', 'stock'])
)

register(
  'command:invoice',
  ($org, user, obj) =>
    ['inprogress', 'done', 'cash', 'paid'].includes(obj.status) &&
    hasRole(user, ['admin', 'manager', 'finance'])
)

register(
  'command:print-invoice',
  ($org, user, obj) =>
    ['inprogress', 'done', 'cash', 'paid'].includes(obj.status) &&
    hasRole(user, ['admin', 'manager', 'finance'])
)
