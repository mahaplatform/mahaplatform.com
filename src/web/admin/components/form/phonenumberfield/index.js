import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import PhoneNumberField from './phonenumberfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.phonenumberfield',
  component: PhoneNumberField,
  reducer,
  selectors,
  actions
})
