import { saveRecording } from '../services/workflows'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  await saveRecording(req, {
    action_id: job.data.action_id,
    recording_id: job.data.recording_id,
    url: job.data.url
  })

}

const refresh = async (req, job) => [
  '/admin/campaigns/voice',
  `/admin/campaigns/voice/${job.data.voice_campaign_id}`
]

const SaveWorkflowRecordingQueue = new Queue({
  name: 'save_workflow_recording',
  processor,
  refresh
})

export default SaveWorkflowRecordingQueue
