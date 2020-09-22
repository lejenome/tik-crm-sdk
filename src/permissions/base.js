if (!globalThis.tikSdkPermissions) {
  globalThis.tikSdkPermissions = {}
}

export function register(name, fn) {
  globalThis.tikSdkPermissions[name] = fn
}

export function hasPerm(name, $org, user, obj) {
  if (!(name in globalThis.tikSdkPermissions)) {
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
