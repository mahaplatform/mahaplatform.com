import { Segment } from '../../../../../core/backframe'
import team from './team'
import email from './email'
import password from './password'
import lockout from './lockout'

const signinSegment = new Segment({
  authenticated: false,
  path: '/signin',
  routes: [
    team,
    email,
    password,
    lockout
  ]
})

export default signinSegment
