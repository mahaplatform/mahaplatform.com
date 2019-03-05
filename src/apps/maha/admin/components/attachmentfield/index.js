import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import AttachmentField from './attachmentfield'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.attachmentfield',
  component: AttachmentField,
  reducer,
  actions
})
