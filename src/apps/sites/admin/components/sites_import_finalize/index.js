import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import sitesImportFinalize from './sites_import_finalize'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'expenses.sites_import_finalize',
  component: sitesImportFinalize,
  reducer,
  actions,
  selectors
})
