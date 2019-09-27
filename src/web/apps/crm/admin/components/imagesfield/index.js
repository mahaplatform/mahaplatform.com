import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Imagesfield from './imagesfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Singleton({
  namespace: 'crm.imagesfield',
  component: Imagesfield,
  reducer,
  selectors,
  actions
})
