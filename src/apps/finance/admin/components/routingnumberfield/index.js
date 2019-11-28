import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import RoutingNumberField from './routingnumberfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'finance.routingnumberfield',
  component: RoutingNumberField,
  reducer,
  selectors,
  actions
})
