import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import access from './access'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'crm.access',
  component: access,
  reducer,
  actions,
  selectors
})
