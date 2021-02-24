import enrich from '@apps/analytics/services/enrich'
import Queue from '@core/objects/queue'

const EnrichQueue = new Queue({
  queue: 'analytics',
  name: 'enrich',
  processor: enrich
})

export default EnrichQueue
