import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import electron from './electron'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.electron',
  component: electron,
  reducer,
  actions
})
