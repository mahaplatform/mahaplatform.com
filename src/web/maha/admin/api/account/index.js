import { Segment } from '../../../server'
import update from './update'
import photo from './photo'
import show from './show'

const accountSegment = new Segment({
  path: '/account',
  routes: [
    show,
    update,
    photo
  ]
})

export default accountSegment
