import { Segment } from '../../../../server'
import authorize from './authorize'
import list from './list'
import create from './create'

const googleSegment = new Segment({
  routes: [
    authorize,
    create,
    list
  ]
})

export default googleSegment
