import { Segment } from 'maha'
import all from './all'
import assign from './assign'
import complete from './complete'
import list from './list'

const employeePlanCompetenciesSegment = new Segment({
  path: '/employees/:employee_id/plans/:plan_id/commitments',
  routes: [
    all,
    assign,
    complete,
    list
  ]
})

export default employeePlanCompetenciesSegment
