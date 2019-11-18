import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import payment from './payment'
import * as selectors from './selectors'
import * as actions from './actions'

export default Singleton({
  namespace: 'payment',
  component: payment,
  reducer,
  selectors,
  actions
})
