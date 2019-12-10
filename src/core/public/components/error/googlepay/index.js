import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import googlepay from './googlepay'
import * as actions from './actions'

export default Factory({
  namespace: 'googlepay',
  component: googlepay,
  reducer,
  actions
})
