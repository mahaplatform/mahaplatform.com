import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Preview from './preview'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.preview',
  component: Preview,
  reducer,
  actions
})
