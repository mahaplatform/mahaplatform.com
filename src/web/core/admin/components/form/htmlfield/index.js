import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import htmlfield from './htmlfield'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.htmlfield',
  component: htmlfield,
  reducer,
  actions
})
