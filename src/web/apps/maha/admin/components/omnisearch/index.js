import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import OmniSearch from './omnisearch'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.omnisearch',
  component: OmniSearch,
  reducer,
  actions,
  selectors
})
