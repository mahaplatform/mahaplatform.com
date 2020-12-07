import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import CriteriaBuilder from './criteria_builder'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.criteria_builder',
  component: CriteriaBuilder,
  reducer,
  selectors,
  actions
})
