import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import VoiceDesigner from './voice_designer'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.voice_designer',
  component: VoiceDesigner,
  reducer,
  selectors,
  actions
})
