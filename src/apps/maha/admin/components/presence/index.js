import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import presence from './presence'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.presence',
  component: presence,
  reducer,
  actions
})
