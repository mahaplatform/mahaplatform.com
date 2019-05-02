import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import channel from './channel'
import * as actions from './actions'
import * as selectors from './selectors'

export default Factory({
  namespace: 'chat.channel',
  component: channel,
  reducer,
  actions,
  selectors
})
