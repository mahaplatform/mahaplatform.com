import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import badge from './badge'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.badge',
  component: badge,
  reducer,
  actions
})
