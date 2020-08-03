import { sendCampaign } from '../services/sms_campaigns'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {

  await sendCampaign(req, {
    sms_campaign_id: job.data.sms_campaign_id,
    resend_to: job.data.resend_to
  })

}

const refresh = async (req, job) => [
  '/admin/crm/campaigns/sms',
  `/admin/crm/campaigns/sms/${job.data.sms_campaign_id}`
]

const SendSmsCampaignQueue = new Queue({
  attempts: 1,
  name: 'send_sm,
  refresh
})

export default SendSmsCampaignQueue
