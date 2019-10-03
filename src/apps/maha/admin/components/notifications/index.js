import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import notifications from './notifications'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.notifications',
  component: notifications,
  reducer,
  actions
})
