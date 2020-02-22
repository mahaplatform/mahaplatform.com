import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Table from './table'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.table',
  component: Table,
  reducer,
  selectors,
  actions
})
