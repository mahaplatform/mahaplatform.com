import { sendCampaign } from '../services/email_campaigns'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {

  await sendCampaign(req, {
    email_campaign_id: job.data.email_campaign_id
  })

}

const SendEmailCampaignQueue = new Queue({
  name: 'send_email_campaign',
  processor
})

export default SendEmailCampaignQueue
