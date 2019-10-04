import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import FormDesigner from './form_designer'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.form_designer',
  component: FormDesigner,
  reducer,
  selectors,
  actions
})
