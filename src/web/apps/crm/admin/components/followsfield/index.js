import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import FollowsField from './followsfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.followsfield',
  component: FollowsField,
  reducer,
  selectors,
  actions
})
