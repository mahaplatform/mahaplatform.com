import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import SocialDesigner from './social_designer'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.social_designer',
  component: SocialDesigner,
  reducer,
  selectors,
  actions
})
