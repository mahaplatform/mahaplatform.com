import ProcessEventQueue from '../../queues/process_event_queue'
import Raw from '@apps/analytics/models/raw'

export const createEvent = async(req, { message }) => {

  const raw = await Raw.forge({
    data: message,
    status: 'pending',
    attempts: 0
  }).save(null, {
    transacting: req.analytics
  })

  ProcessEventQueue.enqueue(req, {
    id: raw.get('id')
  })

}
