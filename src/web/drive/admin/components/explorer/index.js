import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import explorer from './explorer'
import * as actions from './actions'

export default Singleton({
  namespace: 'drive.explorer',
  component: explorer,
  reducer,
  actions
})
