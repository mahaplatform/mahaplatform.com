import { sendMessage } from '../services/sms_campaigns'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {

  await sendMessage(req, {
    sms_campaign_id: job.data.sms_campaign_id,
    phone_number_id: job.data.phone_number_id,
    contact_id: job.data.contact_id
  })

}

const refresh = async (req, job) => [
  '/admin/crm/campaigns/sms',
  `/admin/crm/campaigns/sms/${job.data.sms_campaign_id}`
]

const TriggerSMSEnrollmentQueue = new Queue({
  name: 'trigger_sms_enrollment',
  processor,
  refresh
})

export default TriggerSMSEnrollmentQueue
