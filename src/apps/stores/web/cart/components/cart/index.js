import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import cart from './cart'
import * as selectors from './selectors'
import * as actions from './actions'

export default Singleton({
  namespace: 'cart',
  component: cart,
  reducer,
  selectors,
  actions
})
