import { updateDatabase } from '@apps/analytics/services/maxmind'
import Queue from '@core/objects/queue'

const updateMaxmindCron = new Queue({
  queue: 'cron',
  name: 'update_maxmind',
  cron: '0 0 * * *',
  processor: updateDatabase
})

export default updateMaxmindCron
