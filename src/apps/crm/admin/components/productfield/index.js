import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Productfield from './productfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.productfield',
  component: Productfield,
  reducer,
  selectors,
  actions
})
