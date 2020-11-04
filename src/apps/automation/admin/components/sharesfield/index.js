import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import SharesField from './sharesfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.sharesfield',
  component: SharesField,
  reducer,
  selectors,
  actions
})
