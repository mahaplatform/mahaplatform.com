import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Rulesfield from './rulesfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'rulesfield',
  component: Rulesfield,
  reducer,
  selectors,
  actions
})
