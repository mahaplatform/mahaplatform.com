import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import versions from './versions'
import * as actions from './actions'

export default Singleton({
  namespace: 'drive.versions',
  component: versions,
  reducer,
  actions
})
