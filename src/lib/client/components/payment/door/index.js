import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Door from './door'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.door',
  component: Door,
  reducer,
  actions
})
