import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import attachmentManager from './attachment_manager'
import * as actions from './actions'
import * as selectors from './selectors'

const AttachmentManager = Factory({
  namespace: 'maha.attachment_manager',
  component: attachmentManager,
  reducer,
  actions,
  selectors
})

export default AttachmentManager
