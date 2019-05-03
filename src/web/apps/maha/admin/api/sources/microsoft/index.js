import { Segment } from '../../../../../../core/backframe'
import authorize from './authorize'
import create from './create'
import list from './list'

const microsoftSegment = new Segment({
  routes: [
    authorize,
    create,
    list
  ]
})

export default microsoftSegment
