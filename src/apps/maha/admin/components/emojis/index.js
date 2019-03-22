import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import emojis from './emojis'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.emojis',
  component: emojis,
  reducer,
  actions,
  selectors
})
