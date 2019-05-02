import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import chatbar from './chatbar'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'chat.chatbar',
  component: chatbar,
  reducer,
  actions,
  selectors
})
