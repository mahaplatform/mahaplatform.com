import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import review from './review'
import * as actions from './actions'

export default Singleton({
  namespace: 'maha.import.review',
  component: review,
  reducer,
  actions
})
