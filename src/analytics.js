import '@core/vendor/sourcemaps'
import '@core/services/environment'
import { startQueues } from '@core/services/queues'

startQueues('analytics')
