import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import ach from './ach'
import * as actions from './actions'
import * as selectors from './selectors'

export default Factory({
  namespace: 'ach',
  component: ach,
  reducer,
  actions,
  selectors
})
