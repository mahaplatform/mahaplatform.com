import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import apps from './apps'
import * as actions from './actions'

export default Factory({
  namespace: 'platform.apps',
  component: apps,
  reducer,
  actions
})
