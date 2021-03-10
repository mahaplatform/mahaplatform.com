import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import signaturefield from './signaturefield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.signaturefield',
  component: signaturefield,
  reducer,
  selectors,
  actions
})
