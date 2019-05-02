import { Segment } from '../../../../server'
import authorize from './authorize'
import create from './create'
import list from './list'

const boxSegment = new Segment({
  routes: [
    authorize,
    create,
    list
  ]
})

export default boxSegment
