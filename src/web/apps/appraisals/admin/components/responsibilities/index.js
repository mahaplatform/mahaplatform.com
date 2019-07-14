import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Responsibilities from './responsibilities'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'responsibilities',
  component: Responsibilities,
  reducer,
  selectors,
  actions
})
