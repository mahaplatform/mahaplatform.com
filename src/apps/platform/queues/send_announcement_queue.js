// import { sendCampaign } from '../services/email_campaigns'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  // await sendCampaign(req, {
  //   email_campaign_id: job.data.email_campaign_id,
  //   resend_to: job.data.resend_to
  // })

}

const refresh = async (req, job) => [
  '/admin/platform/announcements',
  `/admin/platform/announcements/${job.data.email_campaign_id}`
]

const SendAnnouncementQueue = new Queue({
  queue: 'worker',
  name: 'send_announcement',
  attempts: 1,
  processor,
  refresh
})

export default SendAnnouncementQueue
