import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Activities from './activities'
import * as selectors from './selectors'
import * as actions from './actions'

export default Singleton({
  namespace: 'crm.activities',
  component: Activities,
  reducer,
  selectors,
  actions
})
