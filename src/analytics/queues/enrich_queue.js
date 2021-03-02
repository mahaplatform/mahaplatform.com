import enrich from '@analytics/services/enrich'
import Queue from '@core/analytics/objects/queue'

const EnrichQueue = new Queue({
  queue: 'analytics',
  name: 'enrich',
  log: process.env.NODE_ENV !== 'production',
  processor: enrich
})

export default EnrichQueue
