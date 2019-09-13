import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import New from './new'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.attachments_new',
  component: New,
  reducer,
  selectors,
  actions
})
