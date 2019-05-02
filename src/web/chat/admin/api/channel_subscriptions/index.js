import { Segment } from 'maha'
import list from './list'
import update from './update'

const assignSegment = new Segment({
  path: '/channels/:id',
  routes: [
    list,
    update
  ]
})

export default assignSegment
