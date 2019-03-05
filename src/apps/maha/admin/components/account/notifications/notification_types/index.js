import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import NotificationTypes from './notification_types'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.notification_types',
  component: NotificationTypes,
  reducer,
  actions
})
