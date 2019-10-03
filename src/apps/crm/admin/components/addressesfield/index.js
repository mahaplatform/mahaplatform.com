import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import AddressesField from './addressesfield'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.addressesfield',
  component: AddressesField,
  reducer,
  actions
})
