import model from '@apps/analytics/services/model'
import Queue from '@core/objects/queue'

const ModelQueue = new Queue({
  queue: 'analytics',
  name: 'model',
  processor: model
})

export default ModelQueue
