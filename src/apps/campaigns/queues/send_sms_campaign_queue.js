import { sendCampaign } from '@apps/campaigns/services/sms_campaigns'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  await sendCampaign(req, {
    sms_campaign_id: job.data.sms_campaign_id,
    resend_to: job.data.resend_to
  })

}

const refresh = async (req, job) => [
  '/admin/campaigns/sms',
  `/admin/campaigns/sms/${job.data.sms_campaign_id}`
]

const SendSmsCampaignQueue = new Queue({
  queue: 'worker',
  name: 'send_sms_campaign',
  attempts: 1,
  processor,
  refresh
})

export default SendSmsCampaignQueue
