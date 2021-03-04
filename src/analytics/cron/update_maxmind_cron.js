import Queue from '@core/objects/analyticsqueue'
import { updateDatabase } from '@analytics/services/maxmind'
import knex from '@core/vendor/knex/analytics'

const updateMaxmindCron = new Queue(knex, {
  queue: 'analytics',
  name: 'update_maxmind',
  cron: '0 0 * * *',
  log: process.env.NODE_ENV !== 'production',
  processor: updateDatabase
})

export default updateMaxmindCron
