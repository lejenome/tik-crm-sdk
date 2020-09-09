import config from './config'

export class Cache {
  has(n) {
    return (
      global.localStorage &&
      global.localStorage[`${config.CACHE_PREFIX}_cache_${n}`]
    )
  }

  del(n) {
    if (global.localStorage) {
      delete global.localStorage[`${config.CACHE_PREFIX}_cache_${n}`]
    }
  }

  get(n, use_cache = true) {
    if (use_cache && this.has(n)) {
      try {
        return JSON.parse(
          global.localStorage[`${config.CACHE_PREFIX}_cache_${n}`]
        )
      } catch (e) {}
    }
  }

  set(n, res) {
    if (global.localStorage) {
      const k = `${config.CACHE_PREFIX}_cache_${n}`
      global.localStorage[k] = JSON.stringify(res)
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
