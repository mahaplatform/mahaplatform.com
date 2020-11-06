import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import tasks from './tasks'
import * as actions from './actions'

export default Factory({
  namespace: 'maha.tasks',
  component: tasks,
  reducer,
  actions
})
