import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import attachments from './attachments'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.attachments',
  component: attachments,
  reducer,
  actions,
  selectors
})
