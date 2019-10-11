import Queue from '../../../core/objects/queue'
import { makeCall } from '../services/calls'

const processor = async (job, trx) => {
  await makeCall({ trx }, {
    id: job.data.id
  })
}

const failed = async (job, err, trx) => {}

const MakeCallQueue = new Queue({
  name: 'make_call',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default MakeCallQueue
