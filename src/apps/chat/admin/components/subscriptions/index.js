import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import subscriptions from './subscriptions'
import * as actions from './actions'

export default Factory({
  namespace: 'chat.subscriptions',
  component: subscriptions,
  reducer,
  actions
})
