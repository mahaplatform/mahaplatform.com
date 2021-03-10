import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import registration from './registration'
import * as selectors from './selectors'
import * as actions from './actions'

export default Singleton({
  namespace: 'events.registration',
  component: registration,
  reducer,
  selectors,
  actions
})
