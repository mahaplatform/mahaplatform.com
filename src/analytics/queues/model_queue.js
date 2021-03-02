import model from '@analytics/services/model'
import Queue from '@core/analytics/objects/queue'

const ModelQueue = new Queue({
  queue: 'analytics',
  name: 'model',
  log: process.env.NODE_ENV !== 'production',
  processor: model
})

export default ModelQueue
