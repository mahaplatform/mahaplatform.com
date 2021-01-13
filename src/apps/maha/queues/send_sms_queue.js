import Queue from '@core/objects/queue'
import { queueSMS } from '../services/smses'

const processor = async (req, job) => {

  await queueSMS(req, {
    sms_id: job.data.sms_id
  })

}

const SendSMSQueue = new Queue({
  queue: 'worker',
  name: 'send_sms',
  processor
})

export default SendSMSQueue
