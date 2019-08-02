import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Timeline from './timeline'
import * as selectors from './selectors'
import * as actions from './actions'

export default Singleton({
  namespace: 'crm.timeline',
  component: Timeline,
  reducer,
  selectors,
  actions
})
