import { saveRecording } from '../services/workflows'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {

  await saveRecording(req, {
    action_id: job.data.action_id,
    url: job.data.url
  })

}

const refresh = async (req, job) => [
  '/admin/crm/campaigns/voice',
  `/admin/crm/campaigns/voice/${job.data.voice_campaign_id}`
]

const SaveWorkflowRecordingQueue = new Queue({
  name: 'save_workflow_recording',
  processor,
  refresh
})

export default SaveWorkflowRecordingQueue
