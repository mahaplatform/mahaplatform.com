import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Uploader from './uploader'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'drive.uploader',
  component: Uploader,
  reducer,
  selectors,
  actions
})
