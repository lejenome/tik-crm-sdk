export const ROLES: { [key: string]: string[] }

export function register(
  name: string,
  fn: ($org: any, user: any, obj: any) => boolean
): void

export function hasPerm(
  name: string,
  $org: any,
  user: any,
  obj: any | undefined
): boolean

export function hasRole(
  user: any,
  ...roles: string[]
): boolean

export function hasRole(
  user: any,
  roles: string[]
): boolean
