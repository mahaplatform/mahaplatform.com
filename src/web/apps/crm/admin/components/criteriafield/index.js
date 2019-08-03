import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import CriteriaField from './criteriafield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.criteriafield',
  component: CriteriaField,
  reducer,
  selectors,
  actions
})
