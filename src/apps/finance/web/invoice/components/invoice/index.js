import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Invoice from './invoice'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'invoice',
  component: Invoice,
  reducer,
  selectors,
  actions
})
