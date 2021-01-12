import { flushProcessedEvents } from '@apps/analytics/services/raws'
import Queue from '@core/objects/queue'

const FlushProcessedEventsQueue = new Queue({
  name: 'reprocess_failed_events',
  processor: flushProcessedEvents
})

export default FlushProcessedEventsQueue
