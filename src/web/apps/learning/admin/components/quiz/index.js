import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Quiz from './quiz'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'learning.quiz',
  component: Quiz,
  reducer,
  selectors,
  actions
})
