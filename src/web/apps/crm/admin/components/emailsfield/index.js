import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import EmailsField from './emailsfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'emailsfield',
  component: EmailsField,
  reducer,
  selectors,
  actions
})
