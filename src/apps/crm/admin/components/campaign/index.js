import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Campaign from './campaign'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'campaign',
  component: Campaign,
  reducer,
  selectors,
  actions
})
