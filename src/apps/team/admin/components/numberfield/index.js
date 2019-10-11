import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import NumberField from './numberfield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'team.numberfield',
  component: NumberField,
  reducer,
  selectors,
  actions
})
