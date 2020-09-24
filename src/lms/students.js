import { UsersApi } from '../core/users.js'

export class StudentsApi extends UsersApi {
  constructor() {
    super()
    this.resource = 'students'
    this.model_name = 'student'
    this.verbose_name = 'Learner'
    this.verbose_name_plural = 'Learners'
    this.view_perm = 'student:view'
    this.add_perm = 'student:add'
    this.change_perm = 'student:change'
    this.delete_perm = 'student:delete'

    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  new() {
    return {
      first_name: '',
      last_name: '',
      full_name: '',
      roles: ['student'],
      phone: '',
      email: '',
      attrs: {
        unlimited_access: false,
        start_at: '08:00',
        end_at: '18:00',
        summary: '',
        // is_featured: false,
        facebook_url: '',
      },
      description: '',
      headline: '',
      is_active: true,
      is_staff: false,
    }
  }
}

const api = new StudentsApi()

export default api
