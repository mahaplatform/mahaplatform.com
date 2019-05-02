import { Segment } from 'maha'
import signup from './signup'
import signin from './signin'
import reset from './reset'

const membersSegment = new Segment({
  path: '/sites/:site_id/members',
  routes: [
    signup,
    signin,
    reset
  ]
})

export default membersSegment
