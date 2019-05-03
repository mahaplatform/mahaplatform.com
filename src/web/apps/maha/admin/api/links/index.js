import { Segment } from '../../../../../core/backframe'
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
