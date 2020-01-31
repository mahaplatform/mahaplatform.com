import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Card from './card'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'card',
  component: Card,
  reducer,
  selectors,
  actions
})
