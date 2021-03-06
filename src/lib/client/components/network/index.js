import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import network from './network'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.network',
  component: network,
  reducer,
  actions
})
