import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import SMSDesigner from './sms_designer'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.sms_designer',
  component: SMSDesigner,
  reducer,
  selectors,
  actions
})
