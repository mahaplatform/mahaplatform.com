import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Reactions from './reactions'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.reactions',
  component: Reactions,
  reducer,
  actions
})
