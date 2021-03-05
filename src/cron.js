import '@core/services/environment'
import { startQueues } from '@core/services/queues'

startQueues('cron')
