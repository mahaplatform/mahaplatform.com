import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Menu from './menu'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.menu',
  component: Menu,
  reducer,
  selectors,
  actions
})
