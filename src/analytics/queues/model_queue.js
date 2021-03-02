import model from '@analytics/services/model'
import Queue from '@core/analytics/objects/queue'
import knex from '@core/vendor/knex/analytics'

const ModelQueue = new Queue(knex, {
  queue: 'analytics',
  name: 'model',
  log: process.env.NODE_ENV !== 'production',
  processor: model
})

export default ModelQueue
