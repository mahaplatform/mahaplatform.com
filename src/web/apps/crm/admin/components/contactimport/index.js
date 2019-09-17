import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Contactimport from './contactimport'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'contactimport',
  component: Contactimport,
  reducer,
  selectors,
  actions
})
