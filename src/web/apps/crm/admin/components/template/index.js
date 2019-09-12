import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Template from './template'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'template',
  component: Template,
  reducer,
  selectors,
  actions
})
