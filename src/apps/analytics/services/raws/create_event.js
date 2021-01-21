import ProcessEventQueue from '../../queues/process_event_queue'
import Raw from '@apps/analytics/models/raw'

export const createEvent = async(req, { data, status, error }) => {

  const raw = await Raw.forge({
    data,
    status,
    attempts: 0,
    error
  }).save(null, {
    transacting: req.analytics
  })

  ProcessEventQueue.enqueue(req, {
    id: raw.get('id')
  })

}
