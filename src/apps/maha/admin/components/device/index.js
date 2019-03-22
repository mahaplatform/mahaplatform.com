import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import device from './device'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.device',
  component: device,
  reducer,
  actions
})
