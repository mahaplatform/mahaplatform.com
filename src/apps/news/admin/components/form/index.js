import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import form from './form'
import * as actions from './actions'
import * as selectors from './selectors'

const Form = Factory({
  namespace: 'news.form',
  component: form,
  reducer,
  actions,
  selectors
})

export default Form
