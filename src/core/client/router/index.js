import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import router from './router'
import * as actions from './actions'

export default Singleton({
  namespace: 'router',
  component: router,
  reducer,
  actions
})
