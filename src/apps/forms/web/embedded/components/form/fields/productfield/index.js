import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import productfield from './productfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'forms.productfield',
  component: productfield,
  reducer,
  selectors,
  actions
})
