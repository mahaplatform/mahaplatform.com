import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import AppItems from './appitems'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.appitems',
  component: AppItems,
  reducer,
  actions
})
