import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import authorized from './authorized'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.authorized',
  component: authorized,
  reducer,
  actions
})
