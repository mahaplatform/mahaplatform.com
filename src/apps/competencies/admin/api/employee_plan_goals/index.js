import { Segment } from 'maha'
import all from './all'
import assign from './assign'
import complete from './complete'
import list from './list'

const employeePlanGoalsSegment = new Segment({
  path: '/employees/:employee_id/plans/:plan_id/goals',
  routes: [
    all,
    assign,
    complete,
    list
  ]
})

export default employeePlanGoalsSegment
