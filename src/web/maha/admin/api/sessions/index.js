import { Segment } from '../../../server'
import signout from './signout'
import remove from './remove'

const sessionSegment = new Segment({
  path: '/sessions/:id',
  routes: [
    signout,
    remove
  ]
})

export default sessionSegment
