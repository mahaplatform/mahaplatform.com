import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import chooser from './chooser'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.chooser',
  component: chooser,
  reducer,
  actions
})
