import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Phonesfield from './phonesfield'
import * as actions from './actions'

export default Factory({
  namespace: 'crm.phonesfield',
  component: Phonesfield,
  reducer,
  actions
})
