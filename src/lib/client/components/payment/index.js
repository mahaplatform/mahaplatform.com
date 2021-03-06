import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import payment from './payment'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.payment',
  component: payment,
  reducer,
  actions
})
