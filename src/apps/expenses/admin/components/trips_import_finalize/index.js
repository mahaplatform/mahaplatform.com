import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import tripsImportFinalize from './trips_import_finalize'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'expenses.trips_import_finalize',
  component: tripsImportFinalize,
  reducer,
  actions,
  selectors
})
