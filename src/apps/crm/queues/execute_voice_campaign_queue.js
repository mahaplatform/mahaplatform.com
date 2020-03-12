import { executeVoiceCampaign } from '../services/voice_campaigns'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {

  await executeVoiceCampaign(req, {
    enrollment_id: job.data.enrollment_id,
    code: job.data.code
  })

}

const ExecuteVoiceCampaignQueue = new Queue({
  name: 'execute_voice_campaign',
  processor
})

export default ExecuteVoiceCampaignQueue
