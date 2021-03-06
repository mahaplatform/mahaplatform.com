import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Infinite from './infinite'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.infinite',
  component: Infinite,
  reducer,
  actions
})
