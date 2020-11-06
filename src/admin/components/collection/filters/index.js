import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import filters from './filters'
import * as actions from './actions'
import * as selectors from './selectors'

export default Factory({
  namespace: 'maha.filters',
  component: filters,
  reducer,
  actions,
  selectors
})
