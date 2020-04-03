import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Form from './form'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'form',
  component: Form,
  reducer,
  selectors,
  actions
})
