import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import popup from './popup'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.popup',
  component: popup,
  reducer,
  actions
})
