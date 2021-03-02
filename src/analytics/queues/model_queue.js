import model from '@analytics/services/model'
import Queue from '@core/analytics/objects/queue'

const ModelQueue = new Queue({
  queue: 'analytics',
  name: 'model',
  log: false,
  processor: model
})

export default ModelQueue
