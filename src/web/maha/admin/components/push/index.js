import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import push from './push'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.push',
  component: push,
  reducer,
  actions
})
