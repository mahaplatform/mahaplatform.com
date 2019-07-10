import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Questions from './questions'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'learning.questions',
  component: Questions,
  reducer,
  selectors,
  actions
})
