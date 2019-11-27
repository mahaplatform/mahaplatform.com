import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Allocations from './allocations'
import * as selectors from './selectors'
import * as actions from './actions'

export default Singleton({
  namespace: 'expenses.allocations',
  component: Allocations,
  reducer,
  selectors,
  actions
})
