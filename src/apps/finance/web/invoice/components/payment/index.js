import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Payment from './payment'
import * as actions from './actions'

export default Factory({
  namespace: 'payment',
  component: Payment,
  reducer,
  actions
})
