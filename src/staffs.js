import BaseApi from './base.js'
class StaffsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'staffs'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  new() {
    return {
      full_name: '',
      status: 'indoor',
      roles: ['commercial'],
      phone: '',
      email: '',
      attrs: {
        unlimited_access: false,
        // is_freelance: false,
        start_at: '08:00',
        end_at: '18:00',
      },
      is_active: true,
    }
  }

  async me() {
    const obj = await this.http('GET', 'me', null, true)
    return this.toObj(obj)
  }

  toObj(o) {
    const ALL_ROLES = [
      'admin',
      'manager',
      'finance',
      'suivi',
      'commercial',
      'stock',
      'freelance',
    ]
    o.roles = ALL_ROLES.filter((r) => o.roles.includes(r))
    Object.defineProperties(o, {
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
      start_at: {
        value: '08:00',
        writable: false,
      },
      end_at: {
        value: '18:00',
        writable: false,
      },
      unlimited_access: {
        get() {
          return this.attrs.unlimited_access
        },
        set(val) {
          this.attrs.unlimited_access = val
        },
      },
    })
    return o
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
      ...((process.env.MODULES.includes('pos') && ['pos']) || []),
    ]
  }
}

const staffsApi = new StaffsApi()
export default staffsApi
