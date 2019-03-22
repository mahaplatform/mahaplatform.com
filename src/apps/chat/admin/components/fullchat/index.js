import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import FullChat from './fullchat'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'chat.fullchat',
  component: FullChat,
  reducer,
  actions,
  selectors
})
