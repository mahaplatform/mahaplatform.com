import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import CheckboxesField from './checkboxesfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.checkboxesfield',
  component: CheckboxesField,
  reducer,
  selectors,
  actions
})
