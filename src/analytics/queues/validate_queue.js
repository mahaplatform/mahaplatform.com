import validate from '@analytics/services/validate'
import Queue from '@core/analytics/objects/queue'
import knex from '@core/vendor/knex/analytics'

const ValidateQueue = new Queue(knex, {
  queue: 'analytics',
  name: 'validate',
  log: process.env.NODE_ENV !== 'production',
  processor: validate
})

export default ValidateQueue
