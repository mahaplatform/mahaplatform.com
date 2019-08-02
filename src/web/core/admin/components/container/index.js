import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import container from './container'
import * as actions from './actions'
import * as selectors from './selectors'

export const Container = (resources) => (component) => Factory({
  namespace: 'maha.container',
  component: container(resources, component),
  reducer,
  actions,
  selectors
})

export default {
  reducer: {
    'function': reducer,
    'namespace': 'maha.container'
  }
}
