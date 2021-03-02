import { updateDatabase } from '@analytics/services/maxmind'
import Queue from '@core/analytics/objects/queue'

const updateMaxmindCron = new Queue({
  queue: 'analytics',
  name: 'update_maxmind',
  cron: '0 0 * * *',
  log: process.env.NODE_ENV !== 'production',
  processor: updateDatabase
})

export default updateMaxmindCron
