import send_internal_email from './send_internal_email'
import enroll_in_workflow from './enroll_in_workflow'
import send_internal_sms from './send_internal_sms'
import update_property from './update_property'
import subscription from './subscription'
import conditional from './conditional'
import send_email from './send_email'
import interest from './interest'
import consent from './consent'
import wait from './wait'
import goal from './goal'


const blocks = {
  interest,
  subscription,
  consent,
  conditional,
  wait,
  send_email,
  enroll_in_workflow,
  update_property,
  send_internal_email,
  send_internal_sms,
  goal
}

export default blocks
