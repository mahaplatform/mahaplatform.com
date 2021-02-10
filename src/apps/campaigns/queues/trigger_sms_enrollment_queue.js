import { sendMessage } from '@apps/campaigns/services/sms_campaigns'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  await sendMessage(req, {
    sms_campaign_id: job.data.sms_campaign_id,
    phone_number_id: job.data.phone_number_id,
    contact_id: job.data.contact_id
  })

}

const TriggerSMSEnrollmentQueue = new Queue({
  queue: 'worker',
  name: 'trigger_sms_enrollment',
  processor
})

export default TriggerSMSEnrollmentQueue
