import { Segment } from 'maha'
import chat from './chat'
import email from './email'

const assignSegment = new Segment({
  path: '/share',
  routes: [
    chat,
    email
  ]
})

export default assignSegment
