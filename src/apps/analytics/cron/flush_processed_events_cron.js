import { flushProcessedEvents } from '@apps/analytics/services/raws'
import Queue from '@core/objects/queue'

const flushProcessedEventsCron = new Queue({
  queue: 'cron',
  name: 'flush_processed_events',
  cron: '0 1 0 * * *',
  processor: flushProcessedEvents
})

export default flushProcessedEventsCron
