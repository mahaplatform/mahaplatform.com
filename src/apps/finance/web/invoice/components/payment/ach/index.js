import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Ach from './ach'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'finance.ach',
  component: Ach,
  reducer,
  selectors,
  actions
})
