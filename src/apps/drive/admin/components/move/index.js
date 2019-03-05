import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import move from './move'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'drive.move',
  component: move,
  reducer,
  actions,
  selectors
})
