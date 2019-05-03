import subscriptions from './subscriptions'
import { Segment } from '../../../../../core/backframe'
import question from './question'
import password from './password'
import alerts from './alerts'
import show from './show'

const securitySegment = new Segment({
  path: '/account/security',
  routes: [
    show,
    question,
    password,
    alerts,
    subscriptions
  ]
})

export default securitySegment
