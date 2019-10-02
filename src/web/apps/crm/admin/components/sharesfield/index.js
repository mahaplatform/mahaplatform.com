import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Sharesfield from './sharesfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.sharesfield',
  component: Sharesfield,
  reducer,
  selectors,
  actions
})
