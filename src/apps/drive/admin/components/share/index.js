import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import share from './share'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'drive.share',
  component: share,
  reducer,
  actions,
  selectors
})
