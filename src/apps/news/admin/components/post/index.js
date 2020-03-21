import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Post from './post'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'post',
  component: Post,
  reducer,
  selectors,
  actions
})
