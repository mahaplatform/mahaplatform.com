import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import roles from './roles'
import * as actions from './actions'

export default Factory({
  namespace: 'team.roles',
  component: roles,
  reducer,
  actions
})
