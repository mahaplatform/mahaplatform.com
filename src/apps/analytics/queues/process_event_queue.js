import { processEvent } from '@apps/analytics/services/raws'
import Queue from '@core/objects/queue'

const ProcessEventQueue = new Queue({
  queue: 'analytics',
  name: 'process_event',
  log: process.env.NODE_ENV !== 'production',
  processor: async (req, job) => {
    await processEvent(req, {
      id: job.data.id
    })
  }
})

export default ProcessEventQueue
