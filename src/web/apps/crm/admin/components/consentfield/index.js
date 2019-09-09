import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Consentfield from './consentfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'consentfield',
  component: Consentfield,
  reducer,
  selectors,
  actions
})
