import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import search from './search'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.search2',
  component: search,
  reducer,
  actions
})
