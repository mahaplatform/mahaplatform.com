import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import NewCampaign from './newcampaign'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'newcampaign',
  component: NewCampaign,
  reducer,
  selectors,
  actions
})
