import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import wrapper from './wrapper'
import * as actions from './actions'

export default Singleton({
  namespace: 'wrapper',
  component: wrapper,
  reducer,
  actions
})
