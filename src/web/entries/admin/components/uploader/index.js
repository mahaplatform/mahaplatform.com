import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import uploader from './uploader'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.uploader',
  component: uploader,
  reducer,
  actions
})
