import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import File from './file'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.contactimport.file',
  component: File,
  reducer,
  selectors,
  actions
})
