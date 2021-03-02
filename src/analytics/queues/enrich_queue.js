import enrich from '@analytics/services/enrich'
import Queue from '@core/analytics/objects/queue'

const EnrichQueue = new Queue({
  queue: 'analytics',
  name: 'enrich',
  log: false,
  processor: enrich
})

export default EnrichQueue
