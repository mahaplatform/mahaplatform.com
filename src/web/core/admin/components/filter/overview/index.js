import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Overview from './overview'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.filter.overview',
  component: Overview,
  reducer,
  selectors,
  actions
})
