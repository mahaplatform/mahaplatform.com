import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import fix from './fix'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.import.fix',
  component: fix,
  reducer,
  actions,
  selectors
})
