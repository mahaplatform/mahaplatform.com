import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import navigation from './navigation'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.navigation',
  component: navigation,
  reducer,
  actions
})
