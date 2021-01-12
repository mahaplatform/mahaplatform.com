import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import multiform from './multiform'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.multiform',
  component: multiform,
  reducer,
  actions
})
