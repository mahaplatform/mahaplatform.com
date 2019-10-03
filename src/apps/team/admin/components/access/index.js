import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import access from './access'
import * as actions from './actions'

export default Factory({
  namespace: 'team.access',
  component: access,
  reducer,
  actions
})
