import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import DocumentDesigner from './document_designer'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.document_designer',
  component: DocumentDesigner,
  reducer,
  selectors,
  actions
})
