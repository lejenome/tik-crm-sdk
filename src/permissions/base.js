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
