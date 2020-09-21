import BaseApi from '../core/base.js'
import newslettersApi from './newsletters'

export class FormsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'forms'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  name(form) {
    if ('name' in form) {
      return form.name
    } else if ('full_name' in form) {
      return form.full_name
    } else if ('first_name' in form) {
      return `${form.first_name} ${form.last_name || ''}`
    } else if ('fname' in form) {
      return `${form.fname} ${form.lname || ''}`
    } else {
      return ''
    }
  }

  async submit(form, id) {
    if (!form) {
      console.log('Ignore form...')
      return
    }
    console.log('Submit form...')
    form.status = 'inprogress'
    let res
    try {
      res = await this.http('POST', `${id}/submit`, form, true)
      form.status = 'success'
      if (form.email) {
        await newslettersApi.subscribe({
          email: form.email,
          full_name: this.name(form),
        })
      }
    } catch (e) {
      form.status = 'failure'
      throw e
    }
  }
}

const api = new FormsApi()

export default api
