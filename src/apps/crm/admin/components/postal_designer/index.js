import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import PostalDesigner from './postal_designer'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.postal_designer',
  component: PostalDesigner,
  reducer,
  selectors,
  actions
})
