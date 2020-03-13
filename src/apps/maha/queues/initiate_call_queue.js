import Queue from '../../../core/objects/queue'
import { initiateCall } from '../services/calls'

const processor = async (req, job) => {

  await initiateCall(req, {
    call_id: job.data.call_id,
    method: job.data.method,
    url: job.data.url
  })

}

const InitiateCallQueue = new Queue({
  name: 'initiate_call',
  processor
})

export default InitiateCallQueue
