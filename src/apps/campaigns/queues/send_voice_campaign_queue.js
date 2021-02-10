import { scheduleCalls } from '@apps/campaigns/services/voice_campaigns'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  await scheduleCalls(req, {
    voice_campaign_id: job.data.voice_campaign_id,
    resend_to: job.data.resend_to
  })

}

const refresh = async (req, job) => [
  '/admin/campaigns/voice',
  `/admin/campaigns/voice/${job.data.voice_campaign_id}`
]

const SendVoiceCampaignQueue = new Queue({
  queue: 'worker',
  name: 'send_voice_campaign',
  attempts: 1,
  processor,
  refresh
})

export default SendVoiceCampaignQueue
