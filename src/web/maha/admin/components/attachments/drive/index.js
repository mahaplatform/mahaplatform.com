import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import drive from './drive'
import * as actions from './actions'

export default Singleton({
  namespace: 'drive.attachments',
  component: drive,
  reducer,
  actions
})
