import { updateStatus } from '@apps/maha/services/calls'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  await updateStatus(req, {
    parent_sid: job.data.parent_sid,
    sid: job.data.sid,
    body: job.data.body
  })

}

const TwilioStatusQueue = new Queue({
  queue: 'twilio',
  name: 'status',
  processor
})

export default TwilioStatusQueue
