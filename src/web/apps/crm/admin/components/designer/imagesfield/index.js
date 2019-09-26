import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Imagesfield from './imagesfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.designer.imagesfield',
  component: Imagesfield,
  reducer,
  selectors,
  actions
})
