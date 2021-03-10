import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Payment from './payment'
import * as actions from './actions'

export default Factory({
  namespace: 'finance.payment',
  component: Payment,
  reducer,
  actions
})
