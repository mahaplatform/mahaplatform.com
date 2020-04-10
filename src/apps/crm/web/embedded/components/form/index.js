import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import form from './form'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'webform',
  component: form,
  reducer,
  selectors,
  actions
})
