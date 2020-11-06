import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import files from './files'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.attachments_files',
  component: files,
  reducer,
  actions
})
