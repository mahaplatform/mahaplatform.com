import internal_email from './send_internal_email'
import internal_sms from './send_internal_sms'
import workflow from './enroll_in_workflow'
import conditional from './conditional'
import property from './property'
import email from './send_email'
import consent from './consent'
import sms from './send_sms'
import topic from './topic'
import list from './list'
import wait from './wait'
import goal from './goal'

const blocks = {
  topic,
  list,
  consent,
  conditional,
  wait,
  email,
  sms,
  workflow,
  property,
  internal_email,
  internal_sms,
  goal
}

export default blocks
