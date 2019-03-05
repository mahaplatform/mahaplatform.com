import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import intro from './intro'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.import_intro',
  component: intro,
  reducer,
  actions
})
