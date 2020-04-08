import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Door from './door'
import * as actions from './actions'

export default Factory({
  namespace: 'door',
  component: Door,
  reducer,
  actions
})
