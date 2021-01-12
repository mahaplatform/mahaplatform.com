import { flushProcessedEvents } from '@apps/analytics/services/raws'
import cron from '@core/objects/cron'

const flushProcessedEventsCron = cron({
  name: 'flush_processed_events',
  cron: '0 1 0 * * *',
  processor: flushProcessedEvents
})

export default flushProcessedEventsCron
