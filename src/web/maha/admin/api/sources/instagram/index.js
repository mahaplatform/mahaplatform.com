import { Segment } from '../../../../server'
import authorize from './authorize'
import create from './create'
import list from './list'

const instagramSegment = new Segment({
  routes: [
    authorize,
    list,
    create
  ]
})

export default instagramSegment
