import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import WorkflowDesigner from './workflow_designer'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.workflow_designer',
  component: WorkflowDesigner,
  reducer,
  selectors,
  actions
})
