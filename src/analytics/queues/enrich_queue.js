import Queue from '@core/objects/analyticsqueue'
import enrich from '@analytics/services/enrich'
import knex from '@core/vendor/knex/analytics'

const EnrichQueue = new Queue(knex, {
  queue: 'analytics',
  name: 'enrich',
  log: process.env.NODE_ENV !== 'production',
  processor: enrich
})

export default EnrichQueue
