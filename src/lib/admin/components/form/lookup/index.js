import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import lookup from './lookup'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.lookup',
  component: lookup,
  reducer,
  selectors,
  actions
})
