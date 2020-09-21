import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import admin from './admin'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.admin',
  component: admin,
  reducer,
  actions
})
