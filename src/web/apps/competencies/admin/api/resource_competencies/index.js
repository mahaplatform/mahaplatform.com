import { Segment } from '../../../../../core/backframe'
import all from './all'
import assign from './assign'
import list from './list'

const resourceCompetenciesSegment = new Segment({
  path: '/resources/:resource_id/competencies',
  routes: [
    all,
    assign,
    list
  ]
})

export default resourceCompetenciesSegment
