import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Root from './root'
import * as actions from './actions'

export default Singleton({
  namespace: 'news.root',
  component: Root,
  reducer,
  actions
})
