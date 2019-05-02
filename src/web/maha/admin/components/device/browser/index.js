import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import browser from './browser'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.browser',
  component: browser,
  reducer,
  actions
})
