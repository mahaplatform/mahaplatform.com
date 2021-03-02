import enrich from '@analytics/services/enrich'
import Queue from '@core/objects/queue'

const EnrichQueue = new Queue({
  queue: 'analytics',
  name: 'enrich',
  log: false,
  processor: enrich
})

export default EnrichQueue
