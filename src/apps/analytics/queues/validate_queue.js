import validate from '@apps/analytics/services/validate'
import Queue from '@core/objects/queue'

const ValidateQueue = new Queue({
  queue: 'analytics',
  name: 'validate',
  processor: validate
})

export default ValidateQueue
