import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import portal from './portal'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.portal',
  component: portal,
  reducer,
  actions
})
