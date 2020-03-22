import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import New from './new'
import * as actions from './actions'
import * as selectors from './selectors'

const Form = Factory({
  namespace: 'news.new',
  component: New,
  reducer,
  actions,
  // selectors
})

export default Form
