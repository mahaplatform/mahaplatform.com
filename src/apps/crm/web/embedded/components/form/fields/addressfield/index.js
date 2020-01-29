import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import addressfield from './addressfield'
import * as actions from './actions'

export default Factory({
  namespace: 'addressfield',
  component: addressfield,
  reducer,
  actions
})
