import { sendEmail } from '../services/email_campaigns'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {

  await sendEmail(req, {
    email_campaign_id: job.data.email_campaign_id,
    email_address_id: job.data.email_address_id
  })

}

const TriggerEmailEnrollmentQueue = new Queue({
  name: 'trigger_email_enrollment',
  processor
})

export default TriggerEmailEnrollmentQueue
