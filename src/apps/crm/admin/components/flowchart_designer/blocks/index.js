import send_internal_email from './send_internal_email'
import enroll_in_workflow from './enroll_in_workflow'
import send_internal_sms from './send_internal_sms'
import remove_from_list from './remove_from_list'
import update_property from './update_property'
import update_interest from './update_interest'
import add_to_list from './add_to_list'
import send_email from './send_email'
import ifelse from './ifelse'
import wait from './wait'
import goal from './goal'

const blocks = {
  ifelse,
  wait,
  send_email,
  add_to_list,
  remove_from_list,
  enroll_in_workflow,
  update_property,
  update_interest,
  send_internal_email,
  send_internal_sms,
  goal
}

export default blocks
