import TriggerVoiceEnrollmentQueue from '@apps/campaigns/queues/trigger_voice_enrollment_queue'
import VoiceCampaign from '@apps/campaigns/models/voice_campaign'
import { getRecipients } from '../recipients'
import moment from 'moment'

const scheduleCalls = async (req, { voice_campaign_id, resend_to }) => {

  const voice_campaign = await VoiceCampaign.query(qb => {
    qb.where('id', voice_campaign_id)
  }).fetch({
    transacting: req.trx
  })

  const recipients = await getRecipients(req, {
    type: 'voice',
    program_id: voice_campaign.get('program_id'),
    purpose: voice_campaign.get('purpose'),
    ...resend_to || voice_campaign.get('to') || {}
  }).then(result => result.toArray())

  await voice_campaign.save({
    sent_at: moment(),
    status: 'sent'
  }, {
    transacting: req.trx,
    patch: true
  })

  await Promise.map(recipients, async (recipient) => {
    await TriggerVoiceEnrollmentQueue.enqueue(req, {
      voice_campaign_id: voice_campaign.get('id'),
      phone_number_id: recipient.get('phone_number_id'),
      contact_id: recipient.get('contact_id')
    })
  })

}

export default scheduleCalls
