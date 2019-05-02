import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import chat from './chat'
import * as actions from './actions'

export default Singleton({
  namespace: 'drive.share_chat',
  component: chat,
  reducer,
  actions
})
