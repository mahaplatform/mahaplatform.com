import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Picklist from './picklist'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.picklist',
  component: Picklist,
  reducer,
  selectors,
  actions
})
