import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Root from './root'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'chat.root',
  component: Root,
  reducer,
  actions,
  selectors
})
