import { version } from '../package.json'

const DEFAULT_CONFIG = {
  // env: 'production',
  API_BASE_URL: '',
  API_PREFIX: '/api/',
  CACHE_PREFIX: '',
  VERSION: version,
  PROTOCOL: 'https',
  // LANG: 'fr',
}

const config = Object.assign({}, DEFAULT_CONFIG)

export function setConfigValue(k, v) {
  config[k] = v
}

export function setConfig(c) {
  for (const k of Object.keys(DEFAULT_CONFIG)) {
    if (k in c) {
      config[k] = c[k]
    }
  }
}

export default config
