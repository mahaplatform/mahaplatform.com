import { Segment } from 'maha'
import all from './all'
import assign from './assign'
import list from './list'

const employeePlanGoalsSegment = new Segment({
  path: '/plans/:plan_id/goals',
  routes: [
    all,
    assign,
    list
  ]
})

export default employeePlanGoalsSegment
