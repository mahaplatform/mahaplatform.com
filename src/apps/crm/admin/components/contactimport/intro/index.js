import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import intro from './intro'
import * as actions from './actions'

export default Singleton({
  namespace: 'crm.import.intro',
  component: intro,
  reducer,
  actions
})
