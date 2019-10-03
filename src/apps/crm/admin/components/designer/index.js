import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Designer from './designer'
import * as selectors from './selectors'
import * as actions from './actions'

export default Singleton({
  namespace: 'crm.designer',
  component: Designer,
  reducer,
  selectors,
  actions
})
