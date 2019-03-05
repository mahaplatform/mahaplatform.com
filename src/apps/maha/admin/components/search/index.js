import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import search from './search'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.search',
  component: search,
  reducer,
  actions,
  selectors
})
