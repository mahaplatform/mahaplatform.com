import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import card from './card'
import * as actions from './actions'

export default Factory({
  namespace: 'card',
  component: card,
  reducer,
  actions
})
