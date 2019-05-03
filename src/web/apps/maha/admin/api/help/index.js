import { Segment } from '../../../../../core/backframe'
import list from './list'
import show from './show'

const helpSegment = new Segment({
  routes: [
    list,
    show
  ]
})

export default helpSegment
