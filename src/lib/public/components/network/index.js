import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Network from './network'
import * as actions from './actions'

export default Factory({
  namespace: 'network',
  component: Network,
  reducer,
  actions
})
