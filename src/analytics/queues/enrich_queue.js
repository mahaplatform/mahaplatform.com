import enrich from '@analytics/services/enrich'
import Queue from '@core/analytics/objects/queue'
import knex from '@core/vendor/knex/analytics'

const EnrichQueue = new Queue(knex, {
  queue: 'analytics',
  name: 'enrich',
  log: process.env.NODE_ENV !== 'production',
  processor: enrich
})

export default EnrichQueue
