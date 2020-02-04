import send_internal_email from './send_internal_email'
import enroll_in_workflow from './enroll_in_workflow'
import send_internal_sms from './send_internal_sms'
import update_property from './update_property'
import send_email from './send_email'
import ifelse from './ifelse'
import wait from './wait'
import goal from './goal'

import subscription from './subscription'
import interest from './interest'
import consent from './consent'

const blocks = {
  interest,
  subscription,
  consent,
  ifelse,
  wait,
  send_email,
  enroll_in_workflow,
  update_property,
  send_internal_email,
  send_internal_sms,
  goal
}

export default blocks
