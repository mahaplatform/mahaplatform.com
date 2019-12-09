import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Payment from './payment'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'payment',
  component: Payment,
  reducer,
  selectors,
  actions
})
