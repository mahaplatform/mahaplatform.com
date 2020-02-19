import Queue from '../../../core/objects/queue'
import { queueSMS } from '../services/smses'

const processor = async (req, job) => {
  await queueSMS(req, {
    id: job.data.id
  })
}

const SendSMSQueue = new Queue({
  name: 'send_sms',
  processor
})

export default SendSMSQueue
