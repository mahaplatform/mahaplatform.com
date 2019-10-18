import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Recordingfield from './recordingfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'recordingfield',
  component: Recordingfield,
  reducer,
  selectors,
  actions
})
