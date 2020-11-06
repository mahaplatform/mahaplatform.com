import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import PayPal from './paypal'
import * as actions from './actions'
import * as selectors from './selectors'

export default Factory({
  namespace: 'paypal',
  component: PayPal,
  reducer,
  actions,
  selectors
})
