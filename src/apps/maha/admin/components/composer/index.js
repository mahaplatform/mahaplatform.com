import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import composer from './composer'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.composer',
  component: composer,
  reducer,
  actions
})
