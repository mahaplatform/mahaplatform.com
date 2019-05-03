import { Segment } from '../../../../../../core/backframe'
import authorize from './authorize'
import list from './list'
import create from './create'

const facebookSegment = new Segment({
  routes: [
    authorize,
    list,
    create
  ]
})

export default facebookSegment
