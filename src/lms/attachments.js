import BaseApi from '../core/base.js'

export class AttachmentsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'attachments'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }
}

const api = new AttachmentsApi()

export default api
