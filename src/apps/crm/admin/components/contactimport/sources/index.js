import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Sources from './sources'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'contactimport.sources',
  component: Sources,
  reducer,
  selectors,
  actions
})
