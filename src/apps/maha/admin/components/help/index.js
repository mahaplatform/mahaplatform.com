import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import help from './help'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.help',
  component: help,
  reducer,
  actions
})
