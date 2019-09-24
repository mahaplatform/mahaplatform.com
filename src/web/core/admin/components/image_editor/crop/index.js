import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Crop from './crop'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.image_editor.crop',
  component: Crop,
  reducer,
  selectors,
  actions
})
