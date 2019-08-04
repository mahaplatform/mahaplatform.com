import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Criterion from './criterion'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'criterion',
  component: Criterion,
  reducer,
  selectors,
  actions
})
