import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Designer from './designer'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.designer',
  component: Designer,
  reducer,
  selectors,
  actions
})
