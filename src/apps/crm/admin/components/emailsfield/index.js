import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import EmailsField from './emailsfield'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.emailsfield',
  component: EmailsField,
  reducer,
  actions
})
