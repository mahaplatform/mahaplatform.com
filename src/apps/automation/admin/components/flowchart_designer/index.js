import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import FlowchartDesigner from './flowchart_designer'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'automation.flowchart_designer',
  component: FlowchartDesigner,
  reducer,
  selectors,
  actions
})
