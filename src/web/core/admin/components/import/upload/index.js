import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Upload from './upload'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.import.upload',
  component: Upload,
  reducer,
  actions
})
