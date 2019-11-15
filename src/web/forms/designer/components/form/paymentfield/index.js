import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import paymentfield from './paymentfield'
import * as actions from './actions'

export default Factory({
  namespace: 'paymentfield',
  component: paymentfield,
  reducer,
  actions
})
