import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import explorer from './explorer'
import * as actions from './actions'

export default Singleton({
  namespace: 'learning.commitments',
  component: explorer,
  reducer,
  actions
})
