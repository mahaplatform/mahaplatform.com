import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Import from './import'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.import.core',
  component: Import,
  reducer,
  actions
})
