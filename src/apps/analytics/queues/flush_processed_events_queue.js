import { flushProcessedEvents } from '@apps/analytics/services/raws'
import Queue from '@core/objects/queue'

const FlushProcessedEventsQueue = new Queue({
  queue: 'analytics',
  name: 'flush_processed_events',
  processor: flushProcessedEvents
})

export default FlushProcessedEventsQueue
