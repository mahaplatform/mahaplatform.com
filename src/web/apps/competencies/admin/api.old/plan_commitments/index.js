import { Segment } from '../../../../../core/backframe'
import all from './all'
import assign from './assign'
import complete from './complete'
import list from './list'

const planCompetenciesSegment = new Segment({
  path: '/plans/:plan_id/commitments',
  routes: [
    all,
    assign,
    complete,
    list
  ]
})

export default planCompetenciesSegment
