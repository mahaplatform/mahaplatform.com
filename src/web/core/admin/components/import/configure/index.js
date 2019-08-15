import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Configure from './configure'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.import.configure',
  component: Configure,
  reducer,
  actions
})
