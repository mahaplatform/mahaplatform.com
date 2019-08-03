import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Criteria from './criteria'
import * as selectors from './selectors'
import * as actions from './actions'

export default Singleton({
  namespace: 'crm.criteria',
  component: Criteria,
  reducer,
  selectors,
  actions
})
