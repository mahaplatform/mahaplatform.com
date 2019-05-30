import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import sortable_list from './sortable_list'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.sortable_list',
  component: sortable_list,
  reducer,
  actions
})
