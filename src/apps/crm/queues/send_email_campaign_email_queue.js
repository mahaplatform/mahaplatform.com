import { sendMail } from '../../../core/services/email'
import Queue from '../../../core/objects/queue'

const processor = async (job, trx) => {

  await sendMail({
    from: 'no-reply@mahaplatform.com',
    to: 'mochini@gmail.com',
    subject: 'foo',
    html: 'bar'
  })

}

const failed = async (job, err) => {}

const SendEmailCampaignEmailQueue = new Queue({
  name: 'send_email_campaign_email',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default SendEmailCampaignEmailQueue
