import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Options from './options'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'training.options',
  component: Options,
  reducer,
  selectors,
  actions
})
