import { archiveRaws } from '@apps/analytics/services/raws'
import Queue from '@core/objects/queue'

const archiveRawsCron = new Queue({
  queue: 'analytics',
  name: 'archive_raws',
  cron: '0 1 0 * * *',
  log: false,
  processor: archiveRaws
})

export default archiveRawsCron