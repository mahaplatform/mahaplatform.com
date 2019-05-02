import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import admin from './admin'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.admin',
  component: admin,
  reducer,
  actions,
  selectors
})
