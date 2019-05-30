import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import assignment from './assignment'
import * as actions from './actions'
import * as selectors from './selectors'

export default Factory({
  namespace: 'maha.assignment',
  component: assignment,
  reducer,
  actions,
  selectors
})
