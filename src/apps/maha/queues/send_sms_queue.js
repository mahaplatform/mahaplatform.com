import Queue from '../../../core/objects/queue'
import { queueSMS } from '../services/smses'

const processor = async (job, trx) => {
  await queueSMS({ trx }, {
    id: job.data.id
  })
}

const failed = async (job, err, trx) => {}

const SendSMSQueue = new Queue({
  name: 'send_sms',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default SendSMSQueue
