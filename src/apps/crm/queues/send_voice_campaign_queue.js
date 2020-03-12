import { sendVoiceCampaign } from '../services/voice_campaigns'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {

  await sendVoiceCampaign(req, {
    campaign_id: job.data.campaign_id
  })

}

const SendVoiceCampaignQueue = new Queue({
  name: 'send_voice_campaign',
  processor
})

export default SendVoiceCampaignQueue
