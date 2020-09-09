var tikSDK = (function (t) {
  var e = {}
  function n(r) {
    if (e[r]) return e[r].exports
    var i = (e[r] = { i: r, l: !1, exports: {} })
    return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports
  }
  return (
    (n.m = t),
    (n.c = e),
    (n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r })
    }),
    (n.r = function (t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 })
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t
      var r = Object.create(null)
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: t }),
        2 & e && 'string' != typeof t)
      )
        for (var i in t)
          n.d(
            r,
            i,
            function (e) {
              return t[e]
            }.bind(null, i)
          )
      return r
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default
            }
          : function () {
              return t
            }
      return n.d(e, 'a', e), e
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }),
    (n.p = ''),
    n((n.s = 13))
  )
})([
  function (t, e, n) {
    'use strict'
    ;(function (t) {
      n.d(e, 'b', function () {
        return o
      }),
        n.d(e, 'a', function () {
          return s
        })
      var r = n(14),
        i = n(9),
        a = n.n(i)
      const o = { authToken: null, instructorAuthToken: null }
      function s() {
        return t.env.API_BASE_URL + (t.env.API_PREFIX || '/api/')
      }
      e.c = class {
        constructor() {
          ;(this.base_domain = t.env.API_BASE_URL),
            (this.base_url = s()),
            (this.lookup_field = 'id'),
            (this.useCache = { list: !1, get: !1 }),
            (this.validateCache = !0)
        }
        configCache(t, e) {
          ;(this.useCache = t),
            this._cacheTimeout && clearInterval(this._cacheTimeout),
            e &&
              ((this.cacheTimeout = e),
              (this._cacheTimeout = setInterval(() => {
                this.validateCache = !0
              }, this.cacheTimeout)))
        }
        async http(t, e, n, i = !1) {
          e = e ? `${this.resource}/${e}` : '' + this.resource
          let s = {}
          if (n)
            if (Object.values(n).some((t) => t instanceof File)) {
              const t = new FormData()
              for (let [e, r] of Object.entries(n))
                null === r && (r = ''), t.append(e, r)
              n = t
            } else
              (n = JSON.stringify(n)),
                (s = { 'Content-Type': 'application/json; charset=utf-8' })
          else n = void 0
          console.log(t, e, n || '')
          let c,
            u = `${this.base_url}${e}/`
          n && 'GET' === t && ((u += a.a.stringify(n, !0)), (n = null))
          try {
            if (
              (o.authToken && (s.Authorization = 'Bearer ' + o.authToken),
              (c = await fetch(u, {
                method: t,
                headers: s,
                body: n,
                mode: 'cors',
                cache: 'no-cache',
                redirect: 'follow',
                referrer: 'no-referrer',
              })),
              !(c.ok || (i && [404, 401].includes(c.status))))
            ) {
              const t = new Error(c.statusText || c.status)
              throw ((t.response = c), t)
            }
            if ('DELETE' !== t) return await c.json()
          } catch (t) {
            throw (
              (console.error(
                'HTTP Error:',
                u.toString(),
                JSON.stringify(n),
                c && c.status
              ),
              r.a(t),
              t)
            )
          }
        }
        toObj(t) {
          return t
        }
        async list() {
          if (this.useCache.list && !this.validateCache && this.data)
            console.log(`[HTTP] ${this.resource}.list(): using cache`)
          else {
            const t = await this.http('GET', '')
            ;(this.data = t), (this.validateCache = !1)
          }
          return this.data
        }
        async get(t, e = !1) {
          if (t) {
            const n = await this.http('GET', t, null, e)
            return this.toObj(n)
          }
          return this.new()
        }
        async save(t, e, n = !1, r = !1, i = !1) {
          if (((this.validateCache = !0), (!t.id && !e) || n)) {
            return await this.http('POST', '', t, i)
          }
          {
            const n = await this.http(r ? 'PATCH' : 'PUT', e || t.id, t, i)
            return this.toObj(n)
          }
        }
        new() {
          return null
        }
        async delete(t) {
          return (this.validateCache = !0), this.http('DELETE', t)
        }
      }
    }.call(this, n(4)))
  },
  function (t, e, n) {
    'use strict'
    ;(function (t) {
      var r = n(0)
      class i extends r.c {
        constructor() {
          super(), (this.resource = 'site')
        }
        toObj(t) {
          return (
            t.attrs || (t.attrs = {}),
            t.payment_providers || (t.payment_providers = []),
            (t._phone = t.phone),
            delete t.cover_file,
            delete t.picture_file,
            t
          )
        }
      }
      const a = new i()
      const o = new (class {
        constructor(t) {
          t && this.apply(t)
        }
        async refresh() {
          const t = await a.list()
          t && this.apply(t)
        }
        apply(t) {
          this.data = t
          const e = new URL(Object(r.a)())
          ;(this.http_protocol = (e.protocol || 'https:') + '//'),
            (this.http_port = e.port ? ':' + e.port : '')
          const n = {}
          for (const e of t.domains) n[e.type] = e.domain
          n.api || (n.api = n.admin),
            n.admin || (n.admin = n.api),
            n.cdn || (n.cdn = n.api),
            (this.domains = n),
            this.env(this)
        }
        html2txt(t) {
          return t ? t.replace(/<[^>]+>/g, '') : ''
        }
        env(e) {
          return (
            e || (e = {}),
            (e.modules = (this.data.modules || t.env.MODULES || '').split(',')),
            (e.delivery_backends = (
              this.data.delivery_backends ||
              t.env.DELIVERY_BACKENDS ||
              ''
            ).split(',')),
            (e.description = this.data.description || ''),
            (e.description_txt =
              this.data.description_txt ||
              this.html2txt(this.data.description) ||
              ''),
            (e.display_name = this.data.display_name || this.data.name),
            (e.short_name = this.data.name),
            (e.cover = this.static(this.data.cover)),
            (e.picture = this.static(this.data.picture)),
            (e.favicon = this.static(this.data.favicon)),
            (e.logo = this.static(this.data.picture)),
            (e.background_image = this.static(this.data.background_image)),
            (e.email = this.data.email),
            (e.location = this.data.location),
            (e.phone = this.data.phone),
            (e.slug = this.data.slug),
            (e.cache_prefix = this.data.slug),
            (e.about_us = this.data.summary),
            (e.about_us_fr = this.data.summary),
            (e.fb_url = this.data.facebook_url),
            (e.twitter_url = this.data.twitter_url),
            (e.youtube_url = this.data.youtube_url),
            (e.instagram_url = this.data.instagram_url),
            (e.linkedin_url = this.data.linkedin_url),
            (e.wiretransfer = this.data.wiretransfer),
            (e.mandat = this.data.mandat),
            (e.payment_providers = this.data.payment_providers),
            (e.default_currency = this.data.default_currency),
            (e.tax_rate = this.data.tax_rate),
            (e.tax_stamp = this.data.tax_stamp),
            (e.api_prefix = t.env.API_PREFIX || '/api/'),
            (e.maintenance_mode =
              this.data.maintenance_mode || t.env.MAINTENANCE_MODE),
            (e.maintenance_token =
              this.data.maintenance_token || t.env.MAINTENANCE_TOKEN),
            this.domains.webapp
              ? (e.base_url = `${this.http_protocol}${this.domains.webapp}`)
              : (e.base_url = t.env.BASE_URL),
            (e.piwik_site_id = this.data.piwik_site_id || t.env.PIWIK_SITE_ID),
            (e.fb_pixel_id = this.data.fb_pixel_id || t.env.FB_PIXEL_ID),
            (e.fb_page_id = this.data.fb_page_id || t.env.FB_PAGE_ID),
            (e.fb_app_id = this.data.fb_app_id),
            (e.google_analytics_id =
              this.data.google_analytics_id || t.env.GOOGLE_ANALYTICS_ID),
            (e.google_gtag_id =
              this.data.google_gtag_id || t.env.GOOGLE_GTAG_ID),
            (e.locales = (t.env.LOCALES || 'en-US,fr-FR').split(',')),
            (e.default_locale = this.data.default_locale),
            (e.newsletter_default_subject = 'default'),
            e
          )
        }
        ENV(t) {
          function e(t) {
            return null == t ? '' : t
          }
          t || (t = {})
          const n = this.env()
          for (const r of Object.keys(n)) {
            const i = e(n[r])
            if (Array.isArray(i)) t[r.toUpperCase()] = i.join(',')
            else if (i && 'object' == typeof i)
              for (const n of Object.keys(i)) {
                const a = e(i[n])
                t[`${r}_${n}`.toUpperCase()] = a
              }
            else t[r.toUpperCase()] = i
          }
          return t
        }
        static(t) {
          return t && t.startsWith('/')
            ? `${this.http_protocol}${this.domains.cdn}${this.http_port}${t}`
            : t
        }
      })()
      e.a = o
    }.call(this, n(4)))
  },
  function (t, e, n) {
    'use strict'
    ;(function (t, n) {
      e.a = new (class {
        has(e) {
          return (
            t.localStorage && t.localStorage[`${n.env.CACHE_PREFIX}_cache_${e}`]
          )
        }
        del(e) {
          t.localStorage &&
            delete t.localStorage[`${n.env.CACHE_PREFIX}_cache_${e}`]
        }
        get(e, r = !0) {
          if (r && this.has(e))
            try {
              return JSON.parse(
                t.localStorage[`${n.env.CACHE_PREFIX}_cache_${e}`]
              )
            } catch (t) {}
        }
        set(e, r) {
          if (t.localStorage) {
            const i = `${n.env.CACHE_PREFIX}_cache_${e}`
            t.localStorage[i] = JSON.stringify(r)
          }
        }
        async withCache(t, e, n = !1) {
          const r = this.get(t, n)
          if (r) return r
          const i = await e()
          return this.set(t, i), i
        }
        async fallbackCache(t, e, n = !1) {
          let r
          if (n) return this.get(t, !0)
          try {
            ;(r = await e()), this.set(t, r)
          } catch (e) {
            if ('Forbidden' === e.message) throw e
            r = this.get(t, !0)
          }
          return r
        }
      })()
    }.call(this, n(8), n(4)))
  },
  function (t, e, n) {
    'use strict'
    function r(t) {
      return '[object String]' === Object.prototype.toString.call(t)
    }
    function i(t) {
      return '[object Object]' === Object.prototype.toString.call(t)
    }
    function a(t) {
      return '[object RegExp]' === Object.prototype.toString.call(t)
    }
    function o(t) {
      return Boolean(t && t.then && 'function' == typeof t.then)
    }
    n.d(e, 'c', function () {
      return r
    }),
      n.d(e, 'a', function () {
        return i
      }),
      n.d(e, 'b', function () {
        return a
      }),
      n.d(e, 'd', function () {
        return o
      })
  },
  function (t, e) {
    var n,
      r,
      i = (t.exports = {})
    function a() {
      throw new Error('setTimeout has not been defined')
    }
    function o() {
      throw new Error('clearTimeout has not been defined')
    }
    function s(t) {
      if (n === setTimeout) return setTimeout(t, 0)
      if ((n === a || !n) && setTimeout)
        return (n = setTimeout), setTimeout(t, 0)
      try {
        return n(t, 0)
      } catch (e) {
        try {
          return n.call(null, t, 0)
        } catch (e) {
          return n.call(this, t, 0)
        }
      }
    }
    !(function () {
      try {
        n = 'function' == typeof setTimeout ? setTimeout : a
      } catch (t) {
        n = a
      }
      try {
        r = 'function' == typeof clearTimeout ? clearTimeout : o
      } catch (t) {
        r = o
      }
    })()
    var c,
      u = [],
      l = !1,
      p = -1
    function h() {
      l &&
        c &&
        ((l = !1), c.length ? (u = c.concat(u)) : (p = -1), u.length && d())
    }
    function d() {
      if (!l) {
        var t = s(h)
        l = !0
        for (var e = u.length; e; ) {
          for (c = u, u = []; ++p < e; ) c && c[p].run()
          ;(p = -1), (e = u.length)
        }
        ;(c = null),
          (l = !1),
          (function (t) {
            if (r === clearTimeout) return clearTimeout(t)
            if ((r === o || !r) && clearTimeout)
              return (r = clearTimeout), clearTimeout(t)
            try {
              r(t)
            } catch (e) {
              try {
                return r.call(null, t)
              } catch (e) {
                return r.call(this, t)
              }
            }
          })(t)
      }
    }
    function f(t, e) {
      ;(this.fun = t), (this.array = e)
    }
    function _() {}
    ;(i.nextTick = function (t) {
      var e = new Array(arguments.length - 1)
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
      u.push(new f(t, e)), 1 !== u.length || l || s(d)
    }),
      (f.prototype.run = function () {
        this.fun.apply(null, this.array)
      }),
      (i.title = 'browser'),
      (i.browser = !0),
      (i.env = {}),
      (i.argv = []),
      (i.version = ''),
      (i.versions = {}),
      (i.on = _),
      (i.addListener = _),
      (i.once = _),
      (i.off = _),
      (i.removeListener = _),
      (i.removeAllListeners = _),
      (i.emit = _),
      (i.prependListener = _),
      (i.prependOnceListener = _),
      (i.listeners = function (t) {
        return []
      }),
      (i.binding = function (t) {
        throw new Error('process.binding is not supported')
      }),
      (i.cwd = function () {
        return '/'
      }),
      (i.chdir = function (t) {
        throw new Error('process.chdir is not supported')
      }),
      (i.umask = function () {
        return 0
      })
  },
  function (t, e, n) {
    'use strict'
    ;(function (t, r, i) {
      n.d(e, 'c', function () {
        return a
      }),
        n.d(e, 'b', function () {
          return s
        }),
        n.d(e, 'e', function () {
          return c
        }),
        n.d(e, 'a', function () {
          return u
        }),
        n.d(e, 'd', function () {
          return f
        })
      n(3), n(7)
      function a() {
        return (
          '[object process]' ===
          Object.prototype.toString.call(void 0 !== t ? t : 0)
        )
      }
      var o = {}
      function s() {
        return a()
          ? r
          : 'undefined' != typeof window
          ? window
          : 'undefined' != typeof self
          ? self
          : o
      }
      function c() {
        var t = s(),
          e = t.crypto || t.msCrypto
        if (void 0 !== e && e.getRandomValues) {
          var n = new Uint16Array(8)
          e.getRandomValues(n),
            (n[3] = (4095 & n[3]) | 16384),
            (n[4] = (16383 & n[4]) | 32768)
          var r = function (t) {
            for (var e = t.toString(16); e.length < 4; ) e = '0' + e
            return e
          }
          return (
            r(n[0]) +
            r(n[1]) +
            r(n[2]) +
            r(n[3]) +
            r(n[4]) +
            r(n[5]) +
            r(n[6]) +
            r(n[7])
          )
        }
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (
          t
        ) {
          var e = (16 * Math.random()) | 0
          return ('x' === t ? e : (3 & e) | 8).toString(16)
        })
      }
      function u(t) {
        var e = s()
        if (!('console' in e)) return t()
        var n = e.console,
          r = {}
        ;['debug', 'info', 'warn', 'error', 'log', 'assert'].forEach(function (
          t
        ) {
          t in e.console &&
            n[t].__sentry_original__ &&
            ((r[t] = n[t]), (n[t] = n[t].__sentry_original__))
        })
        var i = t()
        return (
          Object.keys(r).forEach(function (t) {
            n[t] = r[t]
          }),
          i
        )
      }
      var l = Date.now(),
        p = 0,
        h = {
          now: function () {
            var t = Date.now() - l
            return t < p && (t = p), (p = t), t
          },
          timeOrigin: l,
        },
        d = (function () {
          if (a())
            try {
              return ((t = 'perf_hooks'), i.require(t)).performance
            } catch (t) {
              return h
            }
          var t,
            e = s().performance
          return e && e.now
            ? (void 0 === e.timeOrigin &&
                (e.timeOrigin = (e.timing && e.timing.navigationStart) || l),
              e)
            : h
        })()
      function f() {
        return (d.timeOrigin + d.now()) / 1e3
      }
    }.call(this, n(4), n(8), n(12)(t)))
  },
  function (t, e, n) {
    'use strict'
    ;(function (t) {
      var r = n(0)
      class i extends r.c {
        constructor() {
          super(),
            (this.resource = 'staffs'),
            this.configCache({ list: !0 }, 36e5)
        }
        new() {
          return {
            full_name: '',
            status: 'indoor',
            roles: ['commercial'],
            phone: '',
            email: '',
            attrs: { unlimited_access: !1, start_at: '08:00', end_at: '18:00' },
            is_active: !0,
          }
        }
        async me() {
          const t = await this.http('GET', 'me', null, !0)
          return this.toObj(t)
        }
        toObj(t) {
          return (
            (t.roles = [
              'admin',
              'manager',
              'finance',
              'suivi',
              'commercial',
              'stock',
              'freelance',
            ].filter((e) => t.roles.includes(e))),
            Object.defineProperties(t, {
              role: {
                get() {
                  return this.roles[0]
                },
              },
              is_admin: {
                get() {
                  return this.roles.includes('admin')
                },
              },
              is_freelance: {
                get() {
                  return this.roles.includes('freelance')
                },
              },
              start_at: { value: '08:00', writable: !1 },
              end_at: { value: '18:00', writable: !1 },
              unlimited_access: {
                get() {
                  return this.attrs.unlimited_access
                },
                set(t) {
                  this.attrs.unlimited_access = t
                },
              },
            }),
            t
          )
        }
        async unlimited() {
          return this.http('GET', 'unlimited')
        }
        roles() {
          return [
            'admin',
            'manager',
            'finance',
            'suivi',
            'commercial',
            'stock',
            ...((t.env.MODULES.includes('pos') && ['pos']) || []),
          ]
        }
      }
      const a = new i()
      e.a = a
    }.call(this, n(4)))
  },
  function (t, e, n) {
    'use strict'
    n.d(e, 'a', function () {
      return r
    })
    n(3)
    function r(t, e) {
      var n = t,
        r = n.length
      if (r <= 150) return n
      e > r && (e = r)
      var i = Math.max(e - 60, 0)
      i < 5 && (i = 0)
      var a = Math.min(i + 140, r)
      return (
        a > r - 5 && (a = r),
        a === r && (i = Math.max(a - 140, 0)),
        (n = n.slice(i, a)),
        i > 0 && (n = "'{snip} " + n),
        a < r && (n += ' {snip}'),
        n
      )
    }
  },
  function (t, e) {
    var n
    n = (function () {
      return this
    })()
    try {
      n = n || new Function('return this')()
    } catch (t) {
      'object' == typeof window && (n = window)
    }
    t.exports = n
  },
  function (t, e, n) {
    'use strict'
    var r = Object.prototype.hasOwnProperty
    function i(t) {
      try {
        return decodeURIComponent(t.replace(/\+/g, ' '))
      } catch (t) {
        return null
      }
    }
    function a(t) {
      try {
        return encodeURIComponent(t)
      } catch (t) {
        return null
      }
    }
    ;(e.stringify = function (t, e) {
      e = e || ''
      var n,
        i,
        o = []
      for (i in ('string' != typeof e && (e = '?'), t))
        if (r.call(t, i)) {
          if (
            ((n = t[i]) || (null != n && !isNaN(n)) || (n = ''),
            (i = a(i)),
            (n = a(n)),
            null === i || null === n)
          )
            continue
          o.push(i + '=' + n)
        }
      return o.length ? e + o.join('&') : ''
    }),
      (e.parse = function (t) {
        for (var e, n = /([^=?#&]+)=?([^&]*)/g, r = {}; (e = n.exec(t)); ) {
          var a = i(e[1]),
            o = i(e[2])
          null === a || null === o || a in r || (r[a] = o)
        }
        return r
      })
  },
  ,
  ,
  function (t, e) {
    t.exports = function (t) {
      if (!t.webpackPolyfill) {
        var e = Object.create(t)
        e.children || (e.children = []),
          Object.defineProperty(e, 'loaded', {
            enumerable: !0,
            get: function () {
              return e.l
            },
          }),
          Object.defineProperty(e, 'id', {
            enumerable: !0,
            get: function () {
              return e.i
            },
          }),
          Object.defineProperty(e, 'exports', { enumerable: !0 }),
          (e.webpackPolyfill = 1)
      }
      return e
    }
  },
  function (t, e, n) {
    'use strict'
    n.r(e),
      n.d(e, 'auth', function () {
        return c
      }),
      n.d(e, 'categories', function () {
        return l
      }),
      n.d(e, 'clients', function () {
        return h
      }),
      n.d(e, 'collections', function () {
        return y
      }),
      n.d(e, 'commands', function () {
        return T
      }),
      n.d(e, 'delivery', function () {
        return v
      }),
      n.d(e, 'organization', function () {
        return _.a
      }),
      n.d(e, 'products', function () {
        return f
      }),
      n.d(e, 'staffs', function () {
        return a.a
      }),
      n.d(e, 'stock', function () {
        return S
      }),
      n.d(e, 'stores', function () {
        return x
      }),
      n.d(e, 'users', function () {
        return O
      })
    var r = n(14),
      i = n(0),
      a = n(6),
      o = n(2)
    class s extends i.c {
      constructor() {
        super(),
          (this.resource = 'token'),
          (this.me = {}),
          (this.ns = { me: 'me', token: 'token', authToken: 'authToken' })
      }
      async fetchMe() {
        return await a.a.me()
      }
      async currentUser() {
        if (this.me && this.me.id) return this.me
        {
          let t
          if (
            (o.a.has(this.ns.me) && (t = o.a.get(this.ns.me)), navigator.onLine)
          )
            try {
              t = await this.fetchMe()
            } catch (t) {}
          return t
            ? (o.a.set(this.ns.me, t),
              (this.me = t),
              r.b((t) => {
                t.setUser({ id: this.me.email })
              }),
              this.me)
            : (await this.logout(), null)
        }
      }
      async login(t, e) {
        const n = await this.http('POST', '', { email: t, password: e }, !0)
        return (
          !!n.access &&
          ((i.b[this.ns.authToken] = n.access),
          o.a.set(this.ns.token, { token: n.access }),
          !0)
        )
      }
      async isLoggedin() {
        const t = o.a.get(this.ns.token)
        if (t) {
          let e = !0
          if (
            (navigator.onLine &&
              ((e = await this.http('POST', 'verify', t, !0)),
              (e = e && 'token_not_valid' !== e.code)),
            e)
          )
            return (i.b[this.ns.authToken] = t.token), console.log(i.b), !0
        }
        return o.a.del(this.ns.token), !1
      }
      async logout() {
        ;(this.me = {}),
          (i.b[this.ns.authToken] = null),
          o.a.del(this.ns.token),
          o.a.del(this.ns.me),
          r.b((t) => {
            t.setUser({})
          })
      }
    }
    var c = new s()
    class u extends i.c {
      constructor() {
        super(),
          (this.resource = 'categories'),
          this.configCache({ list: !0 }, 216e6)
      }
      new() {
        return { id: '', title: '', thumbnail: void 0, is_active: !0 }
      }
    }
    var l = new u()
    class p extends i.c {
      constructor() {
        super(),
          (this.resource = 'clients'),
          this.configCache({ list: !0 }, 3e5)
      }
      new() {
        return {
          full_name: '',
          first_name: '',
          last_name: '',
          attrs: { type: 'detail', facebook_url: '' },
          phone: '',
          address: '',
          country: 'TN',
          state: 'Sfax',
          postal_code: '',
          email: '',
          company_name: '',
          vat_number: '',
        }
      }
      toObj(t) {
        return (
          t.attrs || (t.attrs = {}),
          Object.defineProperties(t, {
            type: {
              get() {
                return this.attrs.type
              },
              set(t) {
                this.attrs.type = t
              },
            },
          }),
          t
        )
      }
      typeAchat() {
        return ['gros', 'detail']
      }
      states() {
        return [
          'Ariana',
          'Beja',
          'Ben Arous',
          'Bizerte',
          'Gabes',
          'Gafsa',
          'Jendouba',
          'Kairouan',
          'Kasserine',
          'Kebili',
          'Kef',
          'Mahdia',
          'Mannouba',
          'Medenine',
          'Monastir',
          'Nabeul',
          'Sfax',
          'Sidi Bouzid',
          'Siliana',
          'Sousse',
          'Tataouine',
          'Tozeur',
          'Tunis',
          'Zaghouan',
        ]
      }
      async rapport(t) {
        return this.http('GET', t + '/rapport')
      }
      async history(t) {
        return this.http('GET', t + '/history')
      }
    }
    var h = new p()
    class d extends i.c {
      constructor() {
        super(),
          (this.resource = 'products'),
          this.configCache({ list: !0 }, 15e3)
      }
      new() {
        return {
          title: '',
          count: 0,
          sku: '',
          category_id: null,
          category_title: '',
          is_active: !0,
          saleoffers: [],
          price_net: 0,
          tax_rate: 19,
          cost_price: 0,
          has_variants: !1,
          is_shipping_required: !0,
          is_digital: !1,
          charge_taxes: !0,
          charge_shipping: !1,
        }
      }
      async addStock(t, e) {
        return this.http('POST', t.sku + '/stock', { count: e })
      }
      async rapport(t) {
        return this.http('GET', 'rapport', t)
      }
      async categories() {
        return l.list()
      }
      defaultPrice(t) {
        return parseFloat(t.price_net) * (1 + t.tax_rate / 100)
      }
      offerPrice(t, e, n) {
        return (
          (t = parseFloat(t)),
          '%' === n.discount_type && n.discount_percentage
            ? (t = parseFloat(t) * (1 - n.discount_percentage / 100))
            : 'n' === n.discount_type &&
              n.discount_amount &&
              (t = parseFloat(t) - parseFloat(n.discount_amount)),
          t * e
        )
      }
      offer(t, e) {
        let n = { count_min: 0, discount_percentage: 0 }
        return (
          t.saleoffers &&
            (n = t.saleoffers.reduce(
              (t, n) =>
                n.count_min <= e && n.count_min >= t.count_min ? n : t,
              n
            )),
          n
        )
      }
      price(t, e) {
        const n = this.defaultPrice(t),
          r = this.offer(t, e)
        return this.offerPrice(n, e, r)
      }
      stockColor(t) {
        return t.count < 300 ? '#dd4b39' : t.count < 500 ? '#f39c12' : '#00a65a'
      }
      status() {
        return [
          {
            name: 'stock',
            displayName: 'Stock',
            icon: 'fa fa-cubes',
            backgroundColor: 'rgb(137, 255, 88)',
          },
          {
            name: 'new',
            displayName: 'Nouveaux',
            icon: 'fa fa-shopping-cart',
            backgroundColor: '#f6e06c',
          },
          {
            name: 'scheduled',
            displayName: 'Réservés',
            icon: 'fa fa-hourglass-half',
            backgroundColor: 'rgb(255, 255, 210)',
            color: 'white',
          },
          {
            name: 'inprogress',
            displayName: 'En Cours',
            icon: 'fa fa-truck',
            backgroundColor: '#337ab7',
          },
          {
            name: 'done',
            displayName: 'Délivrés',
            icon: 'fa fa-check',
            backgroundColor: '#89ff58',
          },
          {
            name: 'canceled',
            displayName: 'Annulés',
            icon: 'fa fa-times',
            backgroundColor: '#ff7b7b',
          },
          {
            name: 'paid',
            displayName: 'Payés',
            icon: 'fa fa-money',
            backgroundColor: 'rgb(32, 216, 223)',
          },
          {
            name: 'returned',
            displayName: 'Retourne Dépot',
            icon: 'fa fa-cubes',
            backgroundColor: '#000000',
            color: 'white',
          },
          {
            name: 'released',
            displayName: 'Libérés',
            icon: 'fa fa-truck',
            backgroundColor: '#131654',
          },
        ]
      }
    }
    var f = new d(),
      _ = n(1)
    class m extends i.c {
      constructor() {
        super(),
          (this.resource = 'collections'),
          this.configCache({ list: !0 }, 36e5)
      }
      new() {
        return {
          sku: '',
          title: '',
          description: '',
          delivery_id: null,
          suivi_id: null,
          items: [{ product_id: null, name: '', price: 0, count: 0 }],
          discount: 0,
          price_net: 0,
          thumbnail: '',
          is_active: !0,
        }
      }
      itemPrice(t) {
        return t.product_id
          ? t.product
            ? f.price(t.product, t.count)
            : void 0
          : parseFloat(t.price)
      }
      addItem(t, e) {
        let n
        'object' == typeof e
          ? ((n = t.items.find((t) => t.product_id === e.id)),
            n
              ? n.count++
              : ((n = {
                  title: e.title,
                  count: 1,
                  product_id: e.id,
                  max_count: e.count,
                  product: e,
                }),
                t.items.push(n)))
          : ((n = {
              title: '',
              count: 0,
              price: 0,
              product_id: null,
              max_count: 0,
            }),
            t.items.push(n)),
          (n.price = this.itemPrice(n)),
          (t.price_net = this.price(t))
      }
      changeItemProduct(t, e, n) {
        'string' == typeof n
          ? ((e.product_id = null),
            (e.product = null),
            (e.title = n),
            (e.max_count = 4294967295))
          : ((e.product_id = n.id),
            (e.product = n),
            (e.title = n.title),
            (e.max_count = n.count || 4294967295)),
          (e.price = 0),
          (e.count = 1),
          (e.price = this.itemPrice(e)),
          (t.price_net = this.price(t))
      }
      removeItem(t, e) {
        t.items.splice(t.items.indexOf(e), 1), (t.price_net = this.price(t))
      }
      price(t) {
        const e =
          t.items.reduce((t, e) => this.itemPrice(e) + t, 0) -
          parseFloat(t.discount)
        return Math.round(100 * e) / 100
      }
    }
    var y = new m()
    class g extends i.c {
      constructor() {
        super(),
          (this.resource = 'delivery-companies'),
          this.configCache({ list: !0 }, 36e5)
      }
      new() {
        return {
          id: '',
          type: 'aramex',
          attrs: {},
          name: '',
          done: 0,
          canceled: 0,
          phone: '',
          email: '',
          address: '',
          is_active: !0,
        }
      }
      async rapport(t) {
        return this.http('GET', 'rapport', t)
      }
      async primary() {
        return (await this.list()).find((t) => t.is_primary)
      }
      types() {
        return [
          {
            ref: 'aramex',
            name: 'Aramex',
            color: 'rgb(228, 51, 51)',
            attrs: [
              { name: 'number', type: 'text', default: '' },
              { name: 'pin', type: 'password', default: '' },
              { name: 'entity', type: 'text', default: 'TUN' },
              { name: 'country_code', type: 'text', default: 'TN' },
            ],
          },
          {
            ref: 'fparcel',
            name: 'FParcel',
            color: 'rgb(23, 97, 39)',
            attrs: [],
          },
          {
            ref: '1delivery',
            name: 'First Delivery',
            color: 'rgb(0, 141, 76)',
            attrs: [],
          },
          {
            ref: 'tnexpress',
            name: 'Tunisia Express',
            color: 'rgb(0, 128, 255)',
            attrs: [
              { name: 'username', type: 'text', default: '' },
              { name: 'password', type: 'password', default: '' },
              { name: 'api_key', type: 'text', default: '' },
            ],
          },
        ]
      }
      status() {
        return [
          {
            name: 'new',
            displayName: 'Nouveaux',
            icon: 'fa fa-hourglass-half',
            backgroundColor: 'rgb(255,255,210)',
            color: 'black',
          },
          {
            name: 'created',
            displayName: 'Command Confirmée',
            icon: 'fa fa-shopping-cart',
            backgroundColor: 'rgb(246, 224, 108)',
            color: 'black',
          },
          {
            name: 'in_delivery_facility',
            displayName: 'En Depot',
            icon: 'fa fa-bank',
            backgroundColor: 'rgb(212, 137, 69)',
          },
          {
            name: 'out_for_delivery',
            displayName: 'En Cours',
            icon: 'fa fa-truck',
            backgroundColor: '#337ab7',
          },
          {
            name: 'returned_delivery_facility',
            displayName: 'Echec',
            icon: 'fa fa-warning',
            backgroundColor: 'rgb(255, 123, 123)',
          },
          {
            name: 'canceled',
            displayName: 'Annulé',
            icon: 'fa fa-times',
            backgroundColor: 'rgb(228, 51, 51)',
          },
          {
            name: 'delivered',
            displayName: 'Délivré',
            icon: 'fa fa-check',
            backgroundColor: 'rgb(137, 255, 88)',
          },
          {
            name: 'returned_shipper',
            displayName: 'Retourne Definitif',
            icon: 'fa fa-cubes',
            backgroundColor: 'black',
          },
          {
            name: 'paid',
            displayName: 'Payé',
            icon: 'fa fa-money',
            backgroundColor: 'rgb(32, 216, 223)',
          },
        ]
      }
    }
    var v = new g()
    class b extends i.c {
      constructor() {
        super(),
          (this.resource = 'stores'),
          this.configCache({ list: !0 }, 36e5)
      }
      new() {
        return {
          id: '',
          title: '',
          thumbnail: void 0,
          phone: '',
          email: '',
          address: '',
          city: '',
          country: 'TN',
          state: 'Sfax',
          company_name: '',
          vat_number: '',
          postal_code: 3e3,
          is_active: !0,
        }
      }
      async primary() {
        return (await this.list()).find((t) => t.is_primary)
      }
    }
    var x = new b()
    class E extends i.c {
      constructor() {
        super(),
          (this.resource = 'commands'),
          this.configCache({ list: !0 }, 6e4)
      }
      async new() {
        return {
          client_id: null,
          client_attrs: {
            full_name: '',
            phone: '',
            address: '',
            country: 'TN',
            state: '',
            city: '',
            postal_code: '',
          },
          type: 'delivery',
          delivery_id: (await v.primary()).id,
          store_id: (await x.primary()).id,
          store_name: (await x.primary()).title,
          commercial_id: null,
          suivi_id: null,
          status: 'new',
          customer_note: '',
          staff_notes: [],
          items: [{ product_id: null, title: '', price: 0, count: 0 }],
          discount: 0,
          total: 0,
        }
      }
      setClient(t, e) {
        e
          ? ((t.client_id = e.id),
            (t.client_attrs.phone = e.phone),
            (t.client_attrs.full_name = e.full_name),
            (t.client_attrs.address = e.address),
            (t.client_attrs.country = e.country),
            (t.client_attrs.state = e.state),
            (t.client_attrs.postal_code = e.postal_code))
          : ((t.client_id = null), (t.client_attrs = {}))
      }
      itemPrice(t) {
        return t.product_id
          ? t.product
            ? f.price(t.product, t.count)
            : void 0
          : parseFloat(t.price)
      }
      addItem(t, e) {
        let n
        'object' == typeof e
          ? ((n = t.items.find((t) => t.product_id === e.id)),
            n
              ? n.count++
              : ((n = {
                  title: e.title,
                  count: 1,
                  product_id: e.id,
                  max_count: e.count,
                  product: e,
                }),
                t.items.push(n)))
          : ((n = {
              title: '',
              count: 0,
              price: 0,
              product_id: null,
              max_count: 0,
            }),
            t.items.push(n)),
          (n.price = this.itemPrice(n)),
          (t.total = this.price(t))
      }
      changeItemProduct(t, e, n) {
        'string' == typeof n
          ? ((e.product_id = null),
            (e.product = null),
            (e.title = n),
            (e.max_count = 4294967295))
          : ((e.product_id = n.id),
            (e.product = n),
            (e.title = n.title),
            (e.max_count = n.count || 4294967295)),
          (e.price = 0),
          (e.count = 1),
          (e.price = this.itemPrice(e)),
          (t.total = this.price(t))
      }
      removeItem(t, e) {
        t.items.splice(t.items.indexOf(e), 1), (t.total = this.price(t))
      }
      price(t) {
        const e =
          t.items.reduce((t, e) => this.itemPrice(e) + t, 0) -
          parseFloat(t.discount || 0)
        return Math.round(100 * e) / 100
      }
      totalHT(t) {
        return _.a.tax_rate
          ? (parseFloat(t.total) + parseFloat(t.discount || 0)) /
              (1 + parseFloat(_.a.tax_rate) / 100)
          : parseFloat(t.total) + parseFloat(t.discount || 0)
      }
      tva(t) {
        return _.a.tax_rate
          ? (parseFloat(t.total) / (1 + parseFloat(_.a.tax_rate) / 100)) *
              (parseFloat(_.a.tax_rate) / 100)
          : 0
      }
      ttc(t) {
        return parseFloat(t.total) + parseFloat(_.a.tax_stamp || 0)
      }
      async rapport(t) {
        return this.http('GET', 'rapport', t)
      }
      async deliver(t, e = null) {
        return e
          ? this.http('POST', t.id + '/deliver', {
              command_id: t.id,
              shipment_id: e,
            })
          : this.http('POST', t.id + '/deliver')
      }
      async track(t) {
        return this.http('POST', t.id + '/track')
      }
      async shipment(t) {
        return this.http('GET', t.id + '/deliver')
      }
      async assign(t, e) {
        return this.http('POST', 'assign', {
          staff_id: t,
          commands: e.map((t) => t.id),
        })
      }
      async makeNew(t, e) {
        return this.http('POST', 'new', {
          staff_id: t,
          commands: e.map((t) => t.id),
        })
      }
      async cash(t, e) {
        return this.http('POST', 'cash', {
          staff_id: t,
          commands: e.map((t) => t.id),
        })
      }
      async paid(t, e) {
        return this.http('POST', 'paid', {
          staff_id: t,
          commands: e.map((t) => t.id),
        })
      }
      async returned(t, e) {
        return this.http('POST', 'returned', {
          staff_id: t,
          commands: e.map((t) => t.id),
        })
      }
      commandTypes() {
        return ['direct', 'delivery']
      }
      commandStatus() {
        return [
          'new',
          'scheduled',
          'inprogress',
          'done',
          'canceled',
          'returned',
          'cash',
          'paid',
        ]
      }
      status() {
        return [
          {
            name: 'new',
            displayName: 'Nouveaux',
            icon: 'fa fa-shopping-cart',
            backgroundColor: '#f6e06c',
            date: 'created_at',
          },
          {
            name: 'scheduled',
            displayName: 'Réservés',
            icon: 'fa fa-hourglass-half',
            backgroundColor: 'rgb(255, 255, 210)',
            date: 'scheduled_at',
          },
          {
            name: 'inprogress',
            displayName: 'En Cours',
            icon: 'fa fa-truck',
            backgroundColor: '#337ab7',
            date: 'assigned_at',
          },
          {
            name: 'done',
            displayName: 'Délivrés',
            icon: 'fa fa-check',
            backgroundColor: '#89ff58',
            date: 'completed_at',
          },
          {
            name: 'canceled',
            displayName: 'Annulés',
            icon: 'fa fa-times',
            backgroundColor: '#ff7b7b',
            date: 'completed_at',
          },
          {
            name: 'cash',
            displayName: 'Encaisés',
            icon: 'fa fa-bank',
            backgroundColor: '#e6e6e6',
            date: 'cash_at',
          },
          {
            name: 'paid',
            displayName: 'Payés',
            icon: 'fa fa-money',
            backgroundColor: 'rgb(32, 216, 223)',
            date: 'paid_at',
          },
          {
            name: 'returned',
            displayName: 'Retourne Dépot',
            icon: 'fa fa-cubes',
            backgroundColor: '#000000',
            color: 'white',
            date: 'paid_at',
            dark: !0,
          },
        ]
      }
    }
    var T = new E()
    class w extends i.c {
      constructor() {
        super(), (this.resource = 'stock'), this.configCache({ list: !0 }, 6e4)
      }
      async report(t, e) {
        return this.http('GET', 'report', { assigned_at: t, suivi_id: e })
      }
      async release(t, e) {
        return this.http('POST', 'release', {
          staff_id: t,
          commands: e.map((t) => t.id),
        })
      }
    }
    var S = new w()
    class k extends i.c {
      constructor() {
        super(), (this.resource = 'users'), this.configCache({ list: !0 }, 36e5)
      }
      async me() {
        return await this.http('GET', 'me', null, !0)
      }
      async activate(t, e) {
        return await this.http('POST', t + '/activate', { token: e }, !0)
      }
      async get_by_email(t) {
        return await this.http('POST', 'email', { email: t }, !0)
      }
    }
    var O = new k()
  },
  function (t, e, n) {
    'use strict'
    n.d(e, 'a', function () {
      return w
    }),
      n.d(e, 'b', function () {
        return S
      })
    var r = function () {
      return (r =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++)
            for (var i in (e = arguments[n]))
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
          return t
        }).apply(this, arguments)
    }
    function i(t, e) {
      var n = 'function' == typeof Symbol && t[Symbol.iterator]
      if (!n) return t
      var r,
        i,
        a = n.call(t),
        o = []
      try {
        for (; (void 0 === e || e-- > 0) && !(r = a.next()).done; )
          o.push(r.value)
      } catch (t) {
        i = { error: t }
      } finally {
        try {
          r && !r.done && (n = a.return) && n.call(a)
        } finally {
          if (i) throw i.error
        }
      }
      return o
    }
    function a() {
      for (var t = [], e = 0; e < arguments.length; e++)
        t = t.concat(i(arguments[e]))
      return t
    }
    var o = n(5),
      s = Object(o.b)(),
      c = 'Sentry Logger ',
      u = (function () {
        function t() {
          this._enabled = !1
        }
        return (
          (t.prototype.disable = function () {
            this._enabled = !1
          }),
          (t.prototype.enable = function () {
            this._enabled = !0
          }),
          (t.prototype.log = function () {
            for (var t = [], e = 0; e < arguments.length; e++)
              t[e] = arguments[e]
            this._enabled &&
              Object(o.a)(function () {
                s.console.log(c + '[Log]: ' + t.join(' '))
              })
          }),
          (t.prototype.warn = function () {
            for (var t = [], e = 0; e < arguments.length; e++)
              t[e] = arguments[e]
            this._enabled &&
              Object(o.a)(function () {
                s.console.warn(c + '[Warn]: ' + t.join(' '))
              })
          }),
          (t.prototype.error = function () {
            for (var t = [], e = 0; e < arguments.length; e++)
              t[e] = arguments[e]
            this._enabled &&
              Object(o.a)(function () {
                s.console.error(c + '[Error]: ' + t.join(' '))
              })
          }),
          t
        )
      })()
    s.__SENTRY__ = s.__SENTRY__ || {}
    var l,
      p = s.__SENTRY__.logger || (s.__SENTRY__.logger = new u()),
      h = n(3)
    !(function (t) {
      ;(t.PENDING = 'PENDING'),
        (t.RESOLVED = 'RESOLVED'),
        (t.REJECTED = 'REJECTED')
    })(l || (l = {}))
    var d = (function () {
        function t(t) {
          var e = this
          ;(this._state = l.PENDING),
            (this._handlers = []),
            (this._resolve = function (t) {
              e._setResult(l.RESOLVED, t)
            }),
            (this._reject = function (t) {
              e._setResult(l.REJECTED, t)
            }),
            (this._setResult = function (t, n) {
              e._state === l.PENDING &&
                (Object(h.d)(n)
                  ? n.then(e._resolve, e._reject)
                  : ((e._state = t), (e._value = n), e._executeHandlers()))
            }),
            (this._attachHandler = function (t) {
              ;(e._handlers = e._handlers.concat(t)), e._executeHandlers()
            }),
            (this._executeHandlers = function () {
              if (e._state !== l.PENDING) {
                var t = e._handlers.slice()
                ;(e._handlers = []),
                  t.forEach(function (t) {
                    t.done ||
                      (e._state === l.RESOLVED &&
                        t.onfulfilled &&
                        t.onfulfilled(e._value),
                      e._state === l.REJECTED &&
                        t.onrejected &&
                        t.onrejected(e._value),
                      (t.done = !0))
                  })
              }
            })
          try {
            t(this._resolve, this._reject)
          } catch (t) {
            this._reject(t)
          }
        }
        return (
          (t.resolve = function (e) {
            return new t(function (t) {
              t(e)
            })
          }),
          (t.reject = function (e) {
            return new t(function (t, n) {
              n(e)
            })
          }),
          (t.all = function (e) {
            return new t(function (n, r) {
              if (Array.isArray(e))
                if (0 !== e.length) {
                  var i = e.length,
                    a = []
                  e.forEach(function (e, o) {
                    t.resolve(e)
                      .then(function (t) {
                        ;(a[o] = t), 0 === (i -= 1) && n(a)
                      })
                      .then(null, r)
                  })
                } else n([])
              else r(new TypeError('Promise.all requires an array as input.'))
            })
          }),
          (t.prototype.then = function (e, n) {
            var r = this
            return new t(function (t, i) {
              r._attachHandler({
                done: !1,
                onfulfilled: function (n) {
                  if (e)
                    try {
                      return void t(e(n))
                    } catch (t) {
                      return void i(t)
                    }
                  else t(n)
                },
                onrejected: function (e) {
                  if (n)
                    try {
                      return void t(n(e))
                    } catch (t) {
                      return void i(t)
                    }
                  else i(e)
                },
              })
            })
          }),
          (t.prototype.catch = function (t) {
            return this.then(function (t) {
              return t
            }, t)
          }),
          (t.prototype.finally = function (e) {
            var n = this
            return new t(function (t, r) {
              var i, a
              return n
                .then(
                  function (t) {
                    ;(a = !1), (i = t), e && e()
                  },
                  function (t) {
                    ;(a = !0), (i = t), e && e()
                  }
                )
                .then(function () {
                  a ? r(i) : t(i)
                })
            })
          }),
          (t.prototype.toString = function () {
            return '[object SyncPromise]'
          }),
          t
        )
      })(),
      f = (function () {
        function t() {
          ;(this._notifyingListeners = !1),
            (this._scopeListeners = []),
            (this._eventProcessors = []),
            (this._breadcrumbs = []),
            (this._user = {}),
            (this._tags = {}),
            (this._extra = {}),
            (this._contexts = {})
        }
        return (
          (t.clone = function (e) {
            var n = new t()
            return (
              e &&
                ((n._breadcrumbs = a(e._breadcrumbs)),
                (n._tags = r({}, e._tags)),
                (n._extra = r({}, e._extra)),
                (n._contexts = r({}, e._contexts)),
                (n._user = e._user),
                (n._level = e._level),
                (n._span = e._span),
                (n._transactionName = e._transactionName),
                (n._fingerprint = e._fingerprint),
                (n._eventProcessors = a(e._eventProcessors))),
              n
            )
          }),
          (t.prototype.addScopeListener = function (t) {
            this._scopeListeners.push(t)
          }),
          (t.prototype.addEventProcessor = function (t) {
            return this._eventProcessors.push(t), this
          }),
          (t.prototype.setUser = function (t) {
            return (this._user = t || {}), this._notifyScopeListeners(), this
          }),
          (t.prototype.setTags = function (t) {
            return (
              (this._tags = r(r({}, this._tags), t)),
              this._notifyScopeListeners(),
              this
            )
          }),
          (t.prototype.setTag = function (t, e) {
            var n
            return (
              (this._tags = r(r({}, this._tags), (((n = {})[t] = e), n))),
              this._notifyScopeListeners(),
              this
            )
          }),
          (t.prototype.setExtras = function (t) {
            return (
              (this._extra = r(r({}, this._extra), t)),
              this._notifyScopeListeners(),
              this
            )
          }),
          (t.prototype.setExtra = function (t, e) {
            var n
            return (
              (this._extra = r(r({}, this._extra), (((n = {})[t] = e), n))),
              this._notifyScopeListeners(),
              this
            )
          }),
          (t.prototype.setFingerprint = function (t) {
            return (this._fingerprint = t), this._notifyScopeListeners(), this
          }),
          (t.prototype.setLevel = function (t) {
            return (this._level = t), this._notifyScopeListeners(), this
          }),
          (t.prototype.setTransactionName = function (t) {
            return (
              (this._transactionName = t), this._notifyScopeListeners(), this
            )
          }),
          (t.prototype.setTransaction = function (t) {
            return this.setTransactionName(t)
          }),
          (t.prototype.setContext = function (t, e) {
            var n
            return (
              (this._contexts = r(
                r({}, this._contexts),
                (((n = {})[t] = e), n)
              )),
              this._notifyScopeListeners(),
              this
            )
          }),
          (t.prototype.setSpan = function (t) {
            return (this._span = t), this._notifyScopeListeners(), this
          }),
          (t.prototype.getSpan = function () {
            return this._span
          }),
          (t.prototype.getTransaction = function () {
            var t = this.getSpan()
            if (t && t.spanRecorder && t.spanRecorder.spans[0])
              return t.spanRecorder.spans[0]
          }),
          (t.prototype.update = function (e) {
            if (!e) return this
            if ('function' == typeof e) {
              var n = e(this)
              return n instanceof t ? n : this
            }
            return (
              e instanceof t
                ? ((this._tags = r(r({}, this._tags), e._tags)),
                  (this._extra = r(r({}, this._extra), e._extra)),
                  (this._contexts = r(r({}, this._contexts), e._contexts)),
                  e._user && (this._user = e._user),
                  e._level && (this._level = e._level),
                  e._fingerprint && (this._fingerprint = e._fingerprint))
                : Object(h.a)(e) &&
                  ((e = e),
                  (this._tags = r(r({}, this._tags), e.tags)),
                  (this._extra = r(r({}, this._extra), e.extra)),
                  (this._contexts = r(r({}, this._contexts), e.contexts)),
                  e.user && (this._user = e.user),
                  e.level && (this._level = e.level),
                  e.fingerprint && (this._fingerprint = e.fingerprint)),
              this
            )
          }),
          (t.prototype.clear = function () {
            return (
              (this._breadcrumbs = []),
              (this._tags = {}),
              (this._extra = {}),
              (this._user = {}),
              (this._contexts = {}),
              (this._level = void 0),
              (this._transactionName = void 0),
              (this._fingerprint = void 0),
              (this._span = void 0),
              this._notifyScopeListeners(),
              this
            )
          }),
          (t.prototype.addBreadcrumb = function (t, e) {
            var n = r({ timestamp: Object(o.d)() }, t)
            return (
              (this._breadcrumbs =
                void 0 !== e && e >= 0
                  ? a(this._breadcrumbs, [n]).slice(-e)
                  : a(this._breadcrumbs, [n])),
              this._notifyScopeListeners(),
              this
            )
          }),
          (t.prototype.clearBreadcrumbs = function () {
            return (this._breadcrumbs = []), this._notifyScopeListeners(), this
          }),
          (t.prototype.applyToEvent = function (t, e) {
            return (
              this._extra &&
                Object.keys(this._extra).length &&
                (t.extra = r(r({}, this._extra), t.extra)),
              this._tags &&
                Object.keys(this._tags).length &&
                (t.tags = r(r({}, this._tags), t.tags)),
              this._user &&
                Object.keys(this._user).length &&
                (t.user = r(r({}, this._user), t.user)),
              this._contexts &&
                Object.keys(this._contexts).length &&
                (t.contexts = r(r({}, this._contexts), t.contexts)),
              this._level && (t.level = this._level),
              this._transactionName && (t.transaction = this._transactionName),
              this._span &&
                (t.contexts = r(
                  { trace: this._span.getTraceContext() },
                  t.contexts
                )),
              this._applyFingerprint(t),
              (t.breadcrumbs = a(t.breadcrumbs || [], this._breadcrumbs)),
              (t.breadcrumbs =
                t.breadcrumbs.length > 0 ? t.breadcrumbs : void 0),
              this._notifyEventProcessors(a(_(), this._eventProcessors), t, e)
            )
          }),
          (t.prototype._notifyEventProcessors = function (t, e, n, i) {
            var a = this
            return (
              void 0 === i && (i = 0),
              new d(function (o, s) {
                var c = t[i]
                if (null === e || 'function' != typeof c) o(e)
                else {
                  var u = c(r({}, e), n)
                  Object(h.d)(u)
                    ? u
                        .then(function (e) {
                          return a
                            ._notifyEventProcessors(t, e, n, i + 1)
                            .then(o)
                        })
                        .then(null, s)
                    : a
                        ._notifyEventProcessors(t, u, n, i + 1)
                        .then(o)
                        .then(null, s)
                }
              })
            )
          }),
          (t.prototype._notifyScopeListeners = function () {
            var t = this
            this._notifyingListeners ||
              ((this._notifyingListeners = !0),
              setTimeout(function () {
                t._scopeListeners.forEach(function (e) {
                  e(t)
                }),
                  (t._notifyingListeners = !1)
              }))
          }),
          (t.prototype._applyFingerprint = function (t) {
            ;(t.fingerprint = t.fingerprint
              ? Array.isArray(t.fingerprint)
                ? t.fingerprint
                : [t.fingerprint]
              : []),
              this._fingerprint &&
                (t.fingerprint = t.fingerprint.concat(this._fingerprint)),
              t.fingerprint && !t.fingerprint.length && delete t.fingerprint
          }),
          t
        )
      })()
    function _() {
      var t = Object(o.b)()
      return (
        (t.__SENTRY__ = t.__SENTRY__ || {}),
        (t.__SENTRY__.globalEventProcessors =
          t.__SENTRY__.globalEventProcessors || []),
        t.__SENTRY__.globalEventProcessors
      )
    }
    var m = (function () {
      function t(t, e, n) {
        void 0 === e && (e = new f()),
          void 0 === n && (n = 3),
          (this._version = n),
          (this._stack = []),
          this._stack.push({ client: t, scope: e }),
          this.bindClient(t)
      }
      return (
        (t.prototype.isOlderThan = function (t) {
          return this._version < t
        }),
        (t.prototype.bindClient = function (t) {
          ;(this.getStackTop().client = t),
            t && t.setupIntegrations && t.setupIntegrations()
        }),
        (t.prototype.pushScope = function () {
          var t = this.getStack(),
            e = t.length > 0 ? t[t.length - 1].scope : void 0,
            n = f.clone(e)
          return this.getStack().push({ client: this.getClient(), scope: n }), n
        }),
        (t.prototype.popScope = function () {
          return void 0 !== this.getStack().pop()
        }),
        (t.prototype.withScope = function (t) {
          var e = this.pushScope()
          try {
            t(e)
          } finally {
            this.popScope()
          }
        }),
        (t.prototype.getClient = function () {
          return this.getStackTop().client
        }),
        (t.prototype.getScope = function () {
          return this.getStackTop().scope
        }),
        (t.prototype.getStack = function () {
          return this._stack
        }),
        (t.prototype.getStackTop = function () {
          return this._stack[this._stack.length - 1]
        }),
        (t.prototype.captureException = function (t, e) {
          var n = (this._lastEventId = Object(o.e)()),
            i = e
          if (!e) {
            var a = void 0
            try {
              throw new Error('Sentry syntheticException')
            } catch (t) {
              a = t
            }
            i = { originalException: t, syntheticException: a }
          }
          return (
            this._invokeClient(
              'captureException',
              t,
              r(r({}, i), { event_id: n })
            ),
            n
          )
        }),
        (t.prototype.captureMessage = function (t, e, n) {
          var i = (this._lastEventId = Object(o.e)()),
            a = n
          if (!n) {
            var s = void 0
            try {
              throw new Error(t)
            } catch (t) {
              s = t
            }
            a = { originalException: t, syntheticException: s }
          }
          return (
            this._invokeClient(
              'captureMessage',
              t,
              e,
              r(r({}, a), { event_id: i })
            ),
            i
          )
        }),
        (t.prototype.captureEvent = function (t, e) {
          var n = (this._lastEventId = Object(o.e)())
          return (
            this._invokeClient('captureEvent', t, r(r({}, e), { event_id: n })),
            n
          )
        }),
        (t.prototype.lastEventId = function () {
          return this._lastEventId
        }),
        (t.prototype.addBreadcrumb = function (t, e) {
          var n = this.getStackTop()
          if (n.scope && n.client) {
            var i = (n.client.getOptions && n.client.getOptions()) || {},
              a = i.beforeBreadcrumb,
              s = void 0 === a ? null : a,
              c = i.maxBreadcrumbs,
              u = void 0 === c ? 100 : c
            if (!(u <= 0)) {
              var l = Object(o.d)(),
                p = r({ timestamp: l }, t),
                h = s
                  ? Object(o.a)(function () {
                      return s(p, e)
                    })
                  : p
              null !== h && n.scope.addBreadcrumb(h, Math.min(u, 100))
            }
          }
        }),
        (t.prototype.setUser = function (t) {
          var e = this.getStackTop()
          e.scope && e.scope.setUser(t)
        }),
        (t.prototype.setTags = function (t) {
          var e = this.getStackTop()
          e.scope && e.scope.setTags(t)
        }),
        (t.prototype.setExtras = function (t) {
          var e = this.getStackTop()
          e.scope && e.scope.setExtras(t)
        }),
        (t.prototype.setTag = function (t, e) {
          var n = this.getStackTop()
          n.scope && n.scope.setTag(t, e)
        }),
        (t.prototype.setExtra = function (t, e) {
          var n = this.getStackTop()
          n.scope && n.scope.setExtra(t, e)
        }),
        (t.prototype.setContext = function (t, e) {
          var n = this.getStackTop()
          n.scope && n.scope.setContext(t, e)
        }),
        (t.prototype.configureScope = function (t) {
          var e = this.getStackTop()
          e.scope && e.client && t(e.scope)
        }),
        (t.prototype.run = function (t) {
          var e = g(this)
          try {
            t(this)
          } finally {
            g(e)
          }
        }),
        (t.prototype.getIntegration = function (t) {
          var e = this.getClient()
          if (!e) return null
          try {
            return e.getIntegration(t)
          } catch (e) {
            return (
              p.warn(
                'Cannot retrieve integration ' + t.id + ' from the current Hub'
              ),
              null
            )
          }
        }),
        (t.prototype.startSpan = function (t) {
          return this._callExtensionMethod('startSpan', t)
        }),
        (t.prototype.startTransaction = function (t) {
          return this._callExtensionMethod('startTransaction', t)
        }),
        (t.prototype.traceHeaders = function () {
          return this._callExtensionMethod('traceHeaders')
        }),
        (t.prototype._invokeClient = function (t) {
          for (var e, n = [], r = 1; r < arguments.length; r++)
            n[r - 1] = arguments[r]
          var i = this.getStackTop()
          i &&
            i.client &&
            i.client[t] &&
            (e = i.client)[t].apply(e, a(n, [i.scope]))
        }),
        (t.prototype._callExtensionMethod = function (t) {
          for (var e = [], n = 1; n < arguments.length; n++)
            e[n - 1] = arguments[n]
          var r = y(),
            i = r.__SENTRY__
          if (i && i.extensions && 'function' == typeof i.extensions[t])
            return i.extensions[t].apply(this, e)
          p.warn('Extension method ' + t + " couldn't be found, doing nothing.")
        }),
        t
      )
    })()
    function y() {
      var t = Object(o.b)()
      return (t.__SENTRY__ = t.__SENTRY__ || { extensions: {}, hub: void 0 }), t
    }
    function g(t) {
      var e = y(),
        n = x(e)
      return E(e, t), n
    }
    function v() {
      var t = y()
      return (
        (b(t) && !x(t).isOlderThan(3)) || E(t, new m()),
        Object(o.c)()
          ? (function (t) {
              try {
                var e = y().__SENTRY__
                if (!e || !e.extensions || !e.extensions.domain) return x(t)
                var n = e.extensions.domain.active
                if (!n) return x(t)
                if (!b(n) || x(n).isOlderThan(3)) {
                  var r = x(t).getStackTop()
                  E(n, new m(r.client, f.clone(r.scope)))
                }
                return x(n)
              } catch (e) {
                return x(t)
              }
            })(t)
          : x(t)
      )
    }
    function b(t) {
      return !!(t && t.__SENTRY__ && t.__SENTRY__.hub)
    }
    function x(t) {
      return (
        (t && t.__SENTRY__ && t.__SENTRY__.hub) ||
          ((t.__SENTRY__ = t.__SENTRY__ || {}), (t.__SENTRY__.hub = new m())),
        t.__SENTRY__.hub
      )
    }
    function E(t, e) {
      return (
        !!t && ((t.__SENTRY__ = t.__SENTRY__ || {}), (t.__SENTRY__.hub = e), !0)
      )
    }
    function T(t) {
      for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
      var r = v()
      if (r && r[t]) return r[t].apply(r, a(e))
      throw new Error(
        'No hub defined or ' +
          t +
          ' was not found on the hub, please open a bug report.'
      )
    }
    function w(t, e) {
      var n
      try {
        throw new Error('Sentry syntheticException')
      } catch (t) {
        n = t
      }
      return T('captureException', t, {
        captureContext: e,
        originalException: t,
        syntheticException: n,
      })
    }
    function S(t) {
      T('configureScope', t)
    }
  },
])
