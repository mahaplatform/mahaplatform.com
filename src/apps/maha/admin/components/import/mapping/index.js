import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Mapping from './mapping'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.import_mapping',
  component: Mapping,
  reducer,
  actions,
  selectors
})
