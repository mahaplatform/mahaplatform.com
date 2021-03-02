import { updateDatabase } from '@analytics/services/maxmind'
import Queue from '@core/objects/queue'

const updateMaxmindCron = new Queue({
  queue: 'analytics',
  name: 'update_maxmind',
  cron: '0 0 * * *',
  log: false,
  processor: updateDatabase
})

export default updateMaxmindCron
