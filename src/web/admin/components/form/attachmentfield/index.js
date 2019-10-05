import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import AttachmentField from './attachmentfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.attachmentfield',
  component: AttachmentField,
  reducer,
  selectors,
  actions
})
