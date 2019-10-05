import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Profilefield from './profilefield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.profilefield',
  component: Profilefield,
  reducer,
  selectors,
  actions
})
