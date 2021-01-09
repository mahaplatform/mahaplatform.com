import './core/vendor/sourcemaps'
import './core/services/environment'
import { updateDatabase } from '@apps/analytics/services/maxmind'

updateDatabase()
