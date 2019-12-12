import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Paypal from './paypal'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'paypal',
  component: Paypal,
  reducer,
  selectors,
  actions
})
