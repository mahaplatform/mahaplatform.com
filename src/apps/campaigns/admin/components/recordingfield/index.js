import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Recordingfield from './recordingfield'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.recordingfield',
  component: Recordingfield,
  reducer,
  actions
})
