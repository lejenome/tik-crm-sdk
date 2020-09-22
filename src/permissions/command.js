import { register } from './base'

register('command:assign', ($org, user, obj) =>
  ['admin', 'suivi', 'manager', 'finance'].includes(user.role)
)

register(
  'command:mark-new',
  ($org, user, obj) =>
    ['admin', 'manager', 'finance', 'commercial'].includes(user.role) &&
    obj.status === 'scheduled'
)

register(
  'command:mark-done',
  ($org, user, obj) =>
    ['admin', 'manager', 'finance', 'suivi'].includes(user.role) &&
    obj.status === 'inprogress'
)

register(
  'command:mark-canceled',
  ($org, user, obj) =>
    ['admin', 'manager', 'finance', 'suivi'].includes(user.role) &&
    object.status === 'inprogress'
)

register(
  'command:mark-returned',
  ($org, user, obj) =>
    ['admin', 'manager', 'finance', 'suivi', 'stock'].includes(user.role) &&
    ['canceled', 'inprogress'].includes(obj.status)
)

register(
  'command:mark-cash',
  ($org, user, obj) =>
    ['admin', 'manager', 'finance'].includes(user.role) &&
    ['done', 'inprogress'].includes(obj.status)
)

register(
  'command:mark-paid',
  ($org, user, obj) =>
    ['admin', 'manager', 'finance'].includes(user.role) &&
    ['cash', 'inprogress'].includes(obj.status)
)

register(
  'command:print-quote',
  ($org, user, obj) =>
    ['admin', 'manager', 'finance', 'stock', 'suivi'].includes(user.role) &&
    obj.id &&
    ['inprogress', 'done', 'canceled'].includes(obj.status)
)

register(
  'command:print-invoice',
  ($org, user, obj) =>
    ['admin', 'manager', 'finance'].includes(user.role) &&
    ['inprogress', 'done', 'cash', 'paid'].includes(obj.status)
)

register(
  'command:print-aramex-label',
  ($org, user, obj) =>
    ['admin', 'manager', 'finance', 'stock'].includes(user.role) &&
    $org.hasDeliveryBackend('aramex') &&
    ['aramex'].includes(obj.delivery_type) &&
    ['inprogress', 'done', 'cash', 'paid'].includes(obj.status)
)

register(
  'command:export-fparcel',
  ($org, user, obj) =>
    ['admin', 'manager', 'finance', 'stock'].includes(user.role) &&
    $org.hasDeliveryBackend('fparcel') &&
    ['fparcel'].includes(obj.delivery_type) &&
    ['inprogress'].includes(obj.status)
)

register(
  'command:export',
  ($org, user, obj) =>
    ['admin', 'manager', 'finance', 'stock'].includes(user.role) &&
    $org.hasModule('export') &&
    ['inprogress'].includes(obj.status)
)

register(
  'command:view-history',
  ($org, user, obj) =>
    obj.id && ['admin', 'manager', 'finance'].includes(user.role)
)

register('command:delete', ($org, user, obj) =>
  ['admin', 'manager'].includes(user.role)
)

register(
  'command:turnback-inprogress',
  ($org, user, obj) =>
    obj &&
    obj.type === 'delivery' &&
    ['done', 'canceled'].includes(obj.status) &&
    ['admin', 'manager'].includes(user.role)
)

register(
  'command:view-shipment',
  ($org, user, obj) =>
    ['admin', 'suivi', 'manager', 'finance'].includes(user.role) &&
    $org.hasDeliveryBackend(obj.delivery_type) &&
    ['inprogress', 'done', 'cash', 'paid', 'returned'].includes(obj.status)
)

register(
  'command:create-shipment',
  ($org, user, obj) =>
    ['admin', 'suivi', 'manager', 'finance'].includes(user.role) &&
    $org.hasDeliveryBackend(obj.delivery_type) &&
    ['new'].includes(obj.status)
)

register(
  'command:assign-shipment',
  ($org, user, obj) =>
    ['admin', 'manager', 'finance'].includes(user.role) &&
    $org.hasDeliveryBackend(obj.delivery_type) &&
    ['aramex'].includes(obj.delivery_id) &&
    !obj.shipment &&
    ['inprogress'].includes(obj.status)
)

register('command:mass-assign-shipment', ($org, user, obj) =>
  ['admin', 'manager', 'finance'].includes(user.role)
)

register(
  'command:track-shipment',
  ($org, user, obj) =>
    ['admin', 'manager', 'finance'].includes(user.role) &&
    $org.hasDeliveryBackend(obj.delivery_type) &&
    obj.shipment &&
    obj.shipment.shipment_id &&
    ['inprogress', 'done', 'cash'].includes(obj.status)
)
register(
  'command:view-cash',
  ($org, user, obj) => ['admin'].includes(user.role) && obj.status === 'done'
)

register(
  'command:view-paid',
  ($org, user, obj) =>
    ['admin'].includes(user.role) && ['cash', 'paid'].includes(obj.status)
)

register(
  'command:view-returned',
  ($org, user, obj) =>
    ['admin'].includes(user.role) &&
    ['canceled', 'returned'].includes(obj.status)
)

register('command:mark-released', ($org, user, obj) =>
  ['admin', 'manager', 'stock'].includes(user.role)
)

register(
  'command:invoice',
  ($org, user, obj) =>
    ['inprogress', 'done', 'cash', 'paid'].includes(obj.status) &&
    ['admin', 'manager', 'finance'].includes(user.role)
)

register('command:add', ($org, user, obj) =>
  ['admin', 'manager', 'finance', 'commercial'].includes(user.role)
)
