import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Preview from './preview'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'maha.import.preview',
  component: Preview,
  reducer,
  actions,
  selectors
})
