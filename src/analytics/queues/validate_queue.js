import validate from '@analytics/services/validate'
import Queue from '@core/analytics/objects/queue'

const ValidateQueue = new Queue({
  queue: 'analytics',
  name: 'validate',
  log: false,
  processor: validate
})

export default ValidateQueue
