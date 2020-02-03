import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import applepay from './applepay'
import * as actions from './actions'
import * as selectors from './selectors'

export default Factory({
  namespace: 'applepay',
  component: applepay,
  reducer,
  actions,
  selectors
})
