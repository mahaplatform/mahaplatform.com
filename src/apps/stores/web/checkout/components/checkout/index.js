import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import checkout from './checkout'
import * as selectors from './selectors'
import * as actions from './actions'

export default Singleton({
  namespace: 'checkout',
  component: checkout,
  reducer,
  selectors,
  actions
})
