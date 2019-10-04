import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Designer from './designer'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.designer',
  component: Designer,
  reducer,
  actions
})
