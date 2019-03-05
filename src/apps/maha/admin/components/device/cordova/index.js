import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import cordova from './cordova'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.cordova',
  component: cordova,
  reducer,
  actions
})
