import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Assignmentfield from './assignmentfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'assignmentfield',
  component: Assignmentfield,
  reducer,
  selectors,
  actions
})
