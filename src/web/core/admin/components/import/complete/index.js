import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import complete from './complete'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.import_complete',
  component: complete,
  reducer,
  actions,
  selectors
})
