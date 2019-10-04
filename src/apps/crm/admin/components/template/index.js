import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Template from './template'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.template',
  component: Template,
  reducer,
  actions
})
