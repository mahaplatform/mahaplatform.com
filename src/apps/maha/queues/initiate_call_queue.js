import Queue from '../../../core/objects/queue'
import { initiateCall } from '../services/calls'

const processor = async (req, job) => {
  await initiateCall(req, {
    id: job.data.id
  })
}

const InitiateCallQueue = new Queue({
  name: 'initiate_call',
  processor
})

export default InitiateCallQueue
