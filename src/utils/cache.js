import config from '../config'

export class Cache {
  has(n) {
    return (
      globalThis.localStorage &&
      globalThis.localStorage[`${config.CACHE_PREFIX}_cache_${n}`]
    )
  }

  del(n) {
    if (globalThis.localStorage) {
      delete globalThis.localStorage[`${config.CACHE_PREFIX}_cache_${n}`]
    }
  }

  get(n, use_cache = true) {
    if (use_cache && this.has(n)) {
      try {
        return JSON.parse(
          globalThis.localStorage[`${config.CACHE_PREFIX}_cache_${n}`]
        )
      } catch (e) {
        console.error('[tikSdk]', e)
      }
    }
  }

  set(n, res) {
    if (globalThis.localStorage) {
      const k = `${config.CACHE_PREFIX}_cache_${n}`
      globalThis.localStorage[k] = JSON.stringify(res)
    }
  }

  async withCache(n, fn, use_cache = false) {
    const cache = this.get(n, use_cache)
    if (cache) return cache
    const res = await fn()
    this.set(n, res)
    return res
  }

  async fallbackCache(n, fn, forceCache = false) {
    let res
    if (forceCache) {
      return this.get(n, true)
    }
    try {
      res = await fn()
      this.set(n, res)
    } catch (e) {
      if (e.message !== 'Forbidden') {
        res = this.get(n, true)
      } else {
        throw e
      }
    }
    return res
  }
}

export default new Cache()
