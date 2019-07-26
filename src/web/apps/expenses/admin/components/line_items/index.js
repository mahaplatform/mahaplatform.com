import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import LineItems from './line_items'
import * as selectors from './selectors'
import * as actions from './actions'

export default Singleton({
  namespace: 'expenses.line_items',
  component: LineItems,
  reducer,
  selectors,
  actions
})
