import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import ImageEditor from './image_editor'
import * as selectors from './selectors'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.image_editor',
  component: ImageEditor,
  reducer,
  selectors,
  actions
})
