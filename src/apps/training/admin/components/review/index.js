import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Review from './review'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'review',
  component: Review,
  reducer,
  selectors,
  actions
})
