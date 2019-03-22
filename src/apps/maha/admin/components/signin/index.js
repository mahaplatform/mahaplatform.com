import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import signin from './signin'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.signin',
  component: signin,
  reducer,
  actions
})
