import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Answers from './answers'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'learning.answers',
  component: Answers,
  reducer,
  selectors,
  actions
})
