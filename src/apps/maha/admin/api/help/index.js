import { Segment } from '../../../server'
import list from './list'
import show from './show'

const helpSegment = new Segment({
  routes: [
    list,
    show
  ]
})

export default helpSegment
