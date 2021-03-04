import Queue from '@core/objects/analyticsqueue'
import validate from '@analytics/services/validate'
import knex from '@core/vendor/knex/analytics'

const ValidateQueue = new Queue(knex, {
  queue: 'analytics',
  name: 'validate',
  log: process.env.NODE_ENV !== 'production',
  processor: validate
})

export default ValidateQueue
