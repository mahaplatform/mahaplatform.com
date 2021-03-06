import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import GooglePay from './googlepay'
import * as actions from './actions'

export default Factory({
  namespace: 'finance.googlepay',
  component: GooglePay,
  reducer,
  actions
})
