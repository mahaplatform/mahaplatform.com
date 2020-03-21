import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Feed from './feed'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'feed',
  component: Feed,
  reducer,
  selectors,
  actions
})
