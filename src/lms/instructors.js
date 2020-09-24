import { UsersApi } from '../core/users.js'

export class InstructorsApi extends UsersApi {
  constructor() {
    super()
    this.resource = 'instructors'
    this.model_name = 'instructor'
    this.verbose_name = 'Creator'
    this.verbose_name_plural = 'Creators'
    this.view_perm = 'instructor:view'
    this.add_perm = 'instructor:add'
    this.change_perm = 'instructor:change'
    this.delete_perm = 'instructor:delete'

    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  async featured() {
    return await this.http('GET', 'featured')
  }

  new() {
    return {
      first_name: '',
      last_name: '',
      full_name: '',
      roles: ['instructor'],
      phone: '',
      email: '',
      attrs: {
        unlimited_access: true,
        start_at: '08:00',
        end_at: '18:00',
        summary: '',
        is_featured: false,
        facebook_url: '',
      },
      description: '',
      headline: '',
      is_active: true,
      is_staff: false,
    }
  }
}

const api = new InstructorsApi()

export default api
