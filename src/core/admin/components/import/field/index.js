import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import field from './field'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.import.field',
  component: field,
  reducer,
  actions,
  selectors
})
