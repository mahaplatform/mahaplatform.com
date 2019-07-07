import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Answers from './answers'
import * as actions from './actions'

export default Factory({
  namespace: 'answers',
  component: Answers,
  reducer,
  actions
})
