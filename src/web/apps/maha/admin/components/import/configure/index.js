import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Configure from './configure'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.import_configure',
  component: Configure,
  reducer,
  actions,
  selectors
})
