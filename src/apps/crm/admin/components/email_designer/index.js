import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import EmailDesigner from './email_designer'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.email_designer',
  component: EmailDesigner,
  reducer,
  selectors,
  actions
})
