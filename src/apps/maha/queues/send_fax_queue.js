import Queue from '../../../core/objects/queue'
import { sendFax } from '../services/faxes'

const processor = async (job, trx) => {
  await sendFax({ trx }, {
    id: job.data.id
  })
}

const failed = async (job, err, trx) => {}

const SendFaxQueue = new Queue({
  name: 'send_fax',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default SendFaxQueue
