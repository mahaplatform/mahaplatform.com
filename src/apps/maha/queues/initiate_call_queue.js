import Queue from '../../../core/objects/queue'
import { initiateCall } from '../services/calls'

const processor = async (job, trx) => {
  await initiateCall({ trx }, {
    id: job.data.id
  })
}

const failed = async (job, err, trx) => {}

const InitiateCallQueue = new Queue({
  name: 'initiate_call',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default InitiateCallQueue
