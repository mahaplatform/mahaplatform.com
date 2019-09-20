import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import PhotoEditor from './photo_editor'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.photo_editor',
  component: PhotoEditor,
  reducer,
  selectors,
  actions
})
