import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Comments from './comments'
import * as actions from './actions'
import * as selectors from './selectors'

export default Factory({
  namespace: 'maha.comments',
  component: Comments,
  reducer,
  actions,
  selectors
})
