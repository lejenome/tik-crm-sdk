import newslettersApi from './newsletters'

const FORM_SPECIAL_KEYS = [
  'email',
  'status',
  'fname',
  'lname',
  'first_name',
  'name',
  'full_name',
  'last_name',
  'phone',
  'target',
  'message',
]

export class NotifyApi {
  message(form) {
    let r = ''
    const keys = Object.keys(form).filter((k) => !FORM_SPECIAL_KEYS.includes(k))
    for (const k of keys) {
      let k_n = k.replace(/[_-]+/, ' ').toLowerCase()
      let v = form[k]
      if (v) {
        v.toString().trim()
      }
      r += `${k_n}: ${v}\n`
    }
    if ('message' in form) {
      r += `\nmessage:\n${form.message}\n`
    }
    return r
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

  async save(form) {
    if (!form || !form.email) {
      console.log('Ignore form...')
      return
    }
    console.log('Submit form...')
    form.status = 'inprogress'
    return fetch('https://api.admin.tik.tn/feedbacks/notify', {
      method: 'POST',
      redirect: 'manual',
      credentials: 'omit',
      refer: '',
      body: JSON.stringify({
        target: form.target || `New Submit - ${process.env.DISPLAY_NAME}`,
        subject: '',
        name: this.name(form),
        phone: form.phone || '',
        from: form.email,
        to: process.env.EMAIL,
        message: this.message(form),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('error')
        }
        form.status = 'success'
        await newslettersApi.subscribe({
          email: form.email,
          full_name: this.name(form),
        })
      })
      .catch((_) => {
        form.status = 'failure'
        throw new Error('error')
      })
  }
}

const api = new NotifyApi()
export default api
