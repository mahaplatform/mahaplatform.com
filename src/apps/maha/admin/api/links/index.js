import { Segment } from '../../../server'
import create from './create'
import show from './show'

const linkSegment = new Segment({
  path: '/links',
  routes: [
    show,
    create
  ]
})

export default linkSegment
