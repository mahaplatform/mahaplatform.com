import { sendCampaign } from '../services/sms_campaigns'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {

  await sendCampaign(req, {
    sms_campaign_id: job.data.sms_campaign_id
  })

}

const SendSmsCampaignQueue = new Queue({
  name: 'send_sms_campaign',
  processor
})

export default SendSmsCampaignQueue
