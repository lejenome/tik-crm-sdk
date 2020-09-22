import { version } from '../package.json'

const DEFAULT_CONFIG = {
  // env: 'production',
  API_BASE_URL: '',
  SAAS_API_BASE_URL: '',
  API_PREFIX: '/api/',
  CACHE_PREFIX: '',
  VERSION: version,
  PROTOCOL: 'https',
  // LANG: 'fr',
}

if (!globalThis.tikSdkConfig) {
  globalThis.tikSdkConfig = {}
}

;(function setDefaultConfig() {
  for (const k of Object.keys(DEFAULT_CONFIG)) {
    if (!(k in globalThis.tikSdkConfig)) {
      globalThis.tikSdkConfig[k] = DEFAULT_CONFIG[k]
    }
  }
})()

export function setConfigValue(k, v) {
  globalThis.tikSdkConfig[k] = v
}

export function setConfig(c) {
  for (const k of Object.keys(DEFAULT_CONFIG)) {
    if (k in c) {
      globalThis.tikSdkConfig[k] = c[k]
    }
  }
}

export function setConfigOrganization($org) {
  setConfig({
    API_BASE_URL: $org.api_base_url,
    API_PREFIX: $org.api_prefix,
    CACHE_PREFIX: $org.cache_prefix,
  })
}

export function base_domain() {
  return globalThis.tikSdkConfig.API_BASE_URL
}

export function base_url() {
  return base_domain() + globalThis.tikSdkConfig.API_PREFIX
}

export function saas_base_domain() {
  return globalThis.tikSdkConfig.SAAS_API_BASE_URL
}

export function saas_base_url() {
  return saas_base_domain() + globalThis.tikSdkConfig.API_PREFIX
}

export default globalThis.tikSdkConfig
