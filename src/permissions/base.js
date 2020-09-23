if (!globalThis.tikSdkPermissions) {
  globalThis.tikSdkPermissions = {}
}

export const ROLES = {
  ALL_ROLES: ['admin', 'manager', 'finance', 'suivi', 'commercial', 'stock'],
  ACTIVE_ROLES: ['admin', 'manager', 'finance', 'suivi', 'commercial'],
  TOP_ADMINS: ['admin', 'manager'],
  SUIVIS: ['admin', 'manager', 'finance', 'suivi'],
  COMMERCIALS: ['admin', 'manager', 'finance', 'commercial'],
  STOCK_TEAM: ['admin', 'manager', 'stock'],
  POS_TEAM: ['admin', 'manager', 'pos'],
}

export function register(name, fn) {
  globalThis.tikSdkPermissions[name] = fn
}

export function hasPerm(name, $org, user, obj) {
  if (!(name in globalThis.tikSdkPermissions)) {
    console.error('permission not found', name)
    return false
  }
  return globalThis.tikSdkPermissions[name]($org, user, obj)
}

export function hasRole(user, ...roles) {
  if (roles.length === 1 && Array.isArray(roles[0])) {
    roles = roles[0]
  }
  return roles.some((r) => user.roles.includes(r))
}
