import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Criteria from './criteria'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.criteria',
  component: Criteria,
  reducer,
  selectors,
  actions
})
