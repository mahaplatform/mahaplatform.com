import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import validating from './validating'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.import_validating',
  component: validating,
  reducer,
  actions,
  selectors
})
