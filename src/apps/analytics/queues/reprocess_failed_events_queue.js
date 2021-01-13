import { reprocessFailedEvents } from '@apps/analytics/services/raws'
import Queue from '@core/objects/queue'

const ReprocessFailedEventsQueue = new Queue({
  queue: 'analytics',
  name: 'reprocess_failed_events',
  processor: reprocessFailedEvents
})

export default ReprocessFailedEventsQueue
