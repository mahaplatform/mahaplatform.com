import send_internal_email from './send_internal_email'
import enroll_in_workflow from './enroll_in_workflow'
import send_internal_sms from './send_internal_sms'
import conditional from './conditional'
import send_email from './send_email'
import interests from './interests'
import property from './property'
import consent from './consent'
import lists from './lists'
import wait from './wait'
import goal from './goal'


const blocks = {
  interests,
  lists,
  consent,
  conditional,
  wait,
  send_email,
  enroll_in_workflow,
  property,
  send_internal_email,
  send_internal_sms,
  goal
}

export default blocks
