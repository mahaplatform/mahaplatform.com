import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import activate from './activate'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.activate',
  component: activate,
  reducer,
  actions
})
