import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Stars from './stars'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.stars',
  component: Stars,
  reducer,
  actions
})
