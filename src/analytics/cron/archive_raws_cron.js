import Queue from '@core/objects/analyticsqueue'
import { archiveRaws } from '@analytics/services/raws'
import knex from '@core/vendor/knex/analytics'

const archiveRawsCron = new Queue(knex, {
  queue: 'analytics',
  name: 'archive_raws',
  cron: '0 1 0 * * *',
  log: process.env.NODE_ENV !== 'production',
  processor: archiveRaws
})

export default archiveRawsCron
