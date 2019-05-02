import { Segment } from 'maha'
import all from './all'
import assign from './assign'
import list from './list'

const competencyResourcesSegment = new Segment({
  path: '/competencies/:competency_id/resources',
  routes: [
    all,
    assign,
    list
  ]
})

export default competencyResourcesSegment
