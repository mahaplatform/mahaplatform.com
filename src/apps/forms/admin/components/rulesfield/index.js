import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Rulesfield from './rulesfield'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.rulesfield',
  component: Rulesfield,
  reducer,
  actions
})
