import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import form from './form'
import * as selectors from './selectors'
import * as actions from './actions'

export default Singleton({
  namespace: 'form',
  component: form,
  reducer,
  selectors,
  actions
})
