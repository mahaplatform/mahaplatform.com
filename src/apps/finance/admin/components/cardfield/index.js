import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import CardField from './cardfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'finance.cardfield',
  component: CardField,
  reducer,
  selectors,
  actions
})
