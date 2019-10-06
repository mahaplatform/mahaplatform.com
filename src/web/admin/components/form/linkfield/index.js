import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Linkfield from './linkfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.linkfield',
  component: Linkfield,
  reducer,
  selectors,
  actions
})
