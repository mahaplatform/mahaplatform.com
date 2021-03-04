import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import web from './web'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.attachments_web',
  component: web,
  reducer,
  actions
})
