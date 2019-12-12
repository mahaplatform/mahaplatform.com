import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import ApplePay from './applepay'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'applepay',
  component: ApplePay,
  reducer,
  selectors,
  actions
})
