import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Parsing from './parsing'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.import_parsing',
  component: Parsing,
  reducer,
  actions,
  selectors
})
