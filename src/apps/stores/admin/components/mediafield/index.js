import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Mediafield from './mediafield'
import * as actions from './actions'

export default Singleton({
  namespace: 'crm.mediafield',
  component: Mediafield,
  reducer,
  actions
})
