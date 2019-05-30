import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import chooser from './chooser'
import * as actions from './actions'

const Chooser = Factory({
  namespace: 'maha.chooser',
  component: chooser,
  reducer,
  actions
})

export default Chooser
