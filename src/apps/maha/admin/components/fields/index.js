import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Fields from './fields'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.fields',
  component: Fields,
  reducer,
  actions
})
