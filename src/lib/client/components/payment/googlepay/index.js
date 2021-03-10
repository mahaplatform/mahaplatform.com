import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import GooglePay from './googlepay'
import * as actions from './actions'
import * as selectors from './selectors'

export default Factory({
  namespace: 'maha.googlepay',
  component: GooglePay,
  reducer,
  actions,
  selectors
})
