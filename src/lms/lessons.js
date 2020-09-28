import BaseApi from '../core/base.js'

export class LessonsApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'lessons'
    this.model_name = 'lesson'
    this.verbose_name = 'Lesson'
    this.verbose_name_plural = 'Lessons'
    this.view_perm = 'lesson:view'
    this.add_perm = 'lesson:add'
    this.change_perm = 'lesson:change'
    this.delete_perm = 'lesson:delete'
    this.configCache({ list: true }, 60 * 60 * 1000)
  }

  new() {
    return {
      resourcetype: null,
      sku: '',
      title: '',
      thumbnail: null,
      description: '',

      free: false,
      comments: 'visible',
      published: false,

      days: 1,
      start_day: 0,
      start_date: null,

      chapter: null,
      course: null,
    }
  }
  types() {
    return [
      { name: 'VideoLesson', icon: 'video', display_text: 'Video Lesson' },
      { name: 'PDFLesson', icon: 'file-pdf', display_text: 'PDF Lesson' },
      {
        name: 'RichTextLesson',
        icon: 'align-justify',
        display_text: 'Rich Text',
      },
      { name: 'EmbedLesson', icon: 'code', display_text: 'Embed' },
      { name: 'Quiz', icon: 'list', display_text: 'Quiz' },
      {
        name: 'DownloadsContent',
        icon: 'file-download',
        display_text: 'Downloads Page',
      },
    ]
  }
}

const api = new LessonsApi()

export default api
