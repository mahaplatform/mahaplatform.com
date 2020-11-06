import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import pageCreator from './container'
import * as actions from './actions'
import * as selectors from './selectors'

export const Page = (pageResources, pageProps) => Factory({
  namespace: 'maha.page',
  component: pageCreator(pageResources, pageProps),
  reducer,
  actions,
  selectors
})

export default {
  reducer: {
    function: reducer,
    namespace: 'maha.page'
  }
}
