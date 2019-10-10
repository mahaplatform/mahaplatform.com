import Queue from '../../../core/objects/queue'
import { sendEmail } from '../services/emails'

const processor = async (job, trx) => {
  await sendEmail({ trx }, {
    id: job.data.id
  })
}

const failed = async (job, err, trx) => {}

const SendEmailQueue = new Queue({
  name: 'send_email',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default SendEmailQueue
