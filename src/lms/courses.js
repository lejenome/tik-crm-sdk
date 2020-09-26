import BaseApi from '../core/base.js'
import enrollsApi from './enrolls'
import lessonsApi from './lessons'
import instructorsApi from './instructors'
import cache from '../utils/cache'

export class CoursesApi extends BaseApi {
  constructor() {
    super()
    this.resource = 'courses'
    this.model_name = 'course'
    this.verbose_name = 'Course'
    this.verbose_name_plural = 'Courses'
    this.view_perm = 'course:view'
    this.add_perm = 'course:add'
    this.change_perm = 'course:change'
    this.delete_perm = 'course:delete'
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

      video: null,
      video_url: null,

      category_id: null,
      category_title: '',

      chapters: [],

      level: 'beginner',
      language: 'fr',
      days: 30,
      published: false,
      is_active: true,
      saleoffers: [],
      price_net: 0,
      tax_rate: 19,
    }
  }

  async getCourse(id, forceCache = false) {
    return await cache.fallbackCache(
      'courses_get_' + id,
      async () => await this.get(id),
      forceCache
    )
  }

  async listCourses(forceCache = false) {
    return await cache.fallbackCache(
      'courses_list',
      async () => await this.list(),
      forceCache
    )
  }

  async getLesson(id, forceCache = false) {
    return await cache.fallbackCache(
      'lessons_get_' + id,
      async () => await lessonsApi.get(id),
      forceCache
    )
  }

  async listEnrolledCourses() {
    return await this.http('GET', `enrolled`)
  }

  getLessonChapter(lesson, course) {
    return course.chapters.find((c) =>
      c.lessons.some((l) => l.id === lesson.id)
    )
  }

  setupCourseLessons(course) {
    let count = 0
    for (const m of course.chapters) {
      for (const l of m.lessons) {
        l.index = count
        l.is_open = true
        l.start_at = {
          immediate: 0,
          daily: 1,
          weekly: 7,
          custom: -1,
        }[course.schedule]
        l.start_at *= l.index
        if (l.start_at === undefined || l.start_at < 0) {
          l.start_at = l.start_date || l.start_day
        }
        count++
      }
    }
    course.lessons_duration = course.days
    course.lessons_days = course.days
    course.lessons_count = count
  }

  setupCourseSchedule(course, enroll, moment) {
    let created_at = null
    if (enroll) {
      created_at = moment(enroll.created_at)
    }
    const now = moment()
    function lessonDeliveryDate(l) {
      if (l.start_date) {
        return moment(l.start_date)
      } else if (enroll) {
        return created_at.clone().add(l.start_at, 'days')
        // .startOf('day')
      } else {
        return moment(l.start_at)
      }
    }
    function canAccessLesson(l) {
      if (enroll) {
        return now > l.start_at
      } else {
        return !l.start_at
      }
    }
    for (const ch of course.chapters) {
      for (const l of ch.lessons) {
        l.start_at = lessonDeliveryDate(l)
        l.is_open = canAccessLesson(l)
      }
    }
    return course
  }

  findLessonOnCourse(lesson, course) {
    for (const ch of course.chapters) {
      for (const l of ch.lessons) {
        if (l.id === lesson.id) {
          return l
        }
      }
    }
  }

  getLessonsCount(course) {
    let count = 0
    for (const m of course.chapters) {
      count += m.lessons.length
    }
    return count
  }

  getLessonsDuration(course) {
    let count = 0
    for (const m of course.chapters) {
      for (const l of m.lessons) {
        count += l.duration || 0
      }
    }
    return count
  }

  getLessonTrainer(id) {
    // FIXME
    try {
      return this.getLessonCourse(id).trainer
    } catch (e) {
      console.error(e)
    }
  }

  fixEnroll(enroll) {
    if (enroll && typeof enroll.completed_lessons === 'string') {
      enroll.completed_lessons = enroll.completed_lessons
        .split(',')
        .map((e) => e.trim())
        .filter((e) => e)
    }
    return enroll
  }

  async getCourseEnroll(course_id, user_id, forceCache = false) {
    // user_id = parseInt(user_id)

    const enroll = await cache.fallbackCache(
      'users_' + user_id + '_enrolls_' + course_id,
      async () => await enrollsApi.get(course_id, true),
      forceCache
    )
    if (enroll && enroll.id) {
      return this.fixEnroll(enroll)
    }
  }

  async getUserEnrolls() {
    // user_id = parseInt(user_id)
    return await enrollsApi.list()
  }

  getNextPrevLessons(course, lesson) {
    let prev = null
    let next = null
    let found = false

    for (const m of course.chapters) {
      if (next) {
        break
      }
      for (const l of m.lessons) {
        if (found) {
          next = l
          break
        }
        if (lesson.id === l.id) {
          found = true
        }
        if (!found) {
          prev = l
        }
      }
    }
    return [prev, next]
  }

  async markCompleted(lesson_id, enroll) {
    const completed_lessons = Array.from(enroll.completed_lessons)
    if (!completed_lessons.includes(lesson_id)) {
      completed_lessons.push(lesson_id)
    }
    enroll = await enrollsApi.save(
      {
        id: enroll.id,
        course: enroll.course,
        completed_lessons: completed_lessons.join(','),
      },
      enroll.id
    )
    return this.fixEnroll(enroll)
  }

  async enroll(course) {
    // user_id = parseInt(user_id)
    if (course.id) {
      course = course.id
    }
    const enroll = await enrollsApi.save({
      course,
      completed_lessons: '',
    })
    return this.fixEnroll(enroll)
  }

  async getInstructor(id, forceCache) {
    // id = parseInt(id)
    return await cache.fallbackCache(
      'instructors_get_' + id,
      async () => await instructorsApi.get(id),
      forceCache
    )
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

const coursesApi = new CoursesApi()

export default coursesApi
