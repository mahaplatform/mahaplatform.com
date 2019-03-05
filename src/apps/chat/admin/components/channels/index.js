import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import channels from './channels'
import * as actions from './actions'
import * as selectors from './selectors'

export default Factory({
  namespace: 'chat.channels',
  component: channels,
  reducer,
  actions,
  selectors
})
