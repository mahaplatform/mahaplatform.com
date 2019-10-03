import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import finalizing from './finalizing'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.import.finalize',
  component: finalizing,
  reducer,
  actions,
  selectors
})
