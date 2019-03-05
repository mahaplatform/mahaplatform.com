import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import processing from './processing'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.import_processing',
  component: processing,
  reducer,
  actions,
  selectors
})
