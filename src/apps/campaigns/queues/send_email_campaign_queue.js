import { sendCampaign } from '../services/email_campaigns'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  await sendCampaign(req, {
    email_campaign_id: job.data.email_campaign_id,
    resend_to: job.data.resend_to
  })

}

const refresh = async (req, job) => [
  '/admin/campaigns/email',
  `/admin/campaigns/email/${job.data.email_campaign_id}`
]

const SendEmailCampaignQueue = new Queue({
  queue: 'worker',
  name: 'send_email_campaign',
  attempts: 1,
  processor,
  refresh
})

export default SendEmailCampaignQueue
