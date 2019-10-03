import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import profiles from './profiles'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.profiles',
  component: profiles,
  reducer,
  actions,
  selectors
})
