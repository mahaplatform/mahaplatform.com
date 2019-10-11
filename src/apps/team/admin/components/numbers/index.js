import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Numbers from './numbers'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'team.numbers',
  component: Numbers,
  reducer,
  selectors,
  actions
})
