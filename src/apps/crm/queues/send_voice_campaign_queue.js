import { scheduleCalls } from '../services/voice_campaigns'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {

  await scheduleCalls(req, {
    voice_campaign_id: job.data.voice_campaign_id,
    resend_to: job.data.resend_to
  })

}

const SendVoiceCampaignQueue = new Queue({
  attempts: 1,
  name: 'send_voice_campaign',
  processor
})

export default SendVoiceCampaignQueue
