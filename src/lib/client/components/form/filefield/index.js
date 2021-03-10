import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import filefield from './filefield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.filefield',
  component: filefield,
  reducer,
  selectors,
  actions
})
