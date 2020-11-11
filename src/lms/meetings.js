import BaseApi from '../core/base.js'

export class MeetingsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'meetings'
    this.model_name = 'meeting'
    this.verbose_name = 'Meeting'
    this.verbose_name_plural = 'Meetings'
    this.view_perm = 'meeting:view'
    this.add_perm = 'meeting:add'
    this.change_perm = 'meeting:change'
    this.delete_perm = 'meeting:delete'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  new() {
    return {
      sku: '',
      title: '',
      thumbnail: null,
      description: '',
      user_id: null,
      user: null,

      webinar: {
        id: null,
        sku: '',
        title: '',
        thumbnail: null,
        description: '',
        recorded: null,
        max_participants: null,
        hard_duration: null,
      },

      duration: null,
      start_at: null,

      guest_allowed: false,
      registration_open: false,

      // video: null,
      // video_url: null,

      // category_id: null,
      // category_title: '',

      published: false,
      is_active: true,
      saleoffers: [],
      price_net: 0,
      tax_rate: 19,
    }
  }

  async join(id, username) {
    const res = await this.http('POST', `${id}/join`, {
      username,
    })
    return res.url
  }
  status(obj) {
    const disabled = {
      display_text: 'Disabled',
      color: 'secondary',
    }
    const draft = {
      display_text: 'Draft',
      color: 'warning',
    }
    const published = {
      display_text: 'Published',
      color: 'success',
    }
    return obj && obj.is_active ? (obj.published ? published : draft) : disabled
  }
}

const api = new MeetingsApi()

export default api
