import { makeCall } from '../services/voice_campaigns'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {

  await makeCall(req, {
    voice_campaign_id: job.data.voice_campaign_id,
    phone_number_id: job.data.phone_number_id,
    contact_id: job.data.contact_id
  })

}

const SendVoiceCampaignCallQueue = new Queue({
  name: 'send_voice_campaign_call',
  processor
})

export default SendVoiceCampaignCallQueue
