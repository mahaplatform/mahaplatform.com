import TriggerVoiceEnrollmentQueue from '../../queues/trigger_voice_enrollment_queue'
import socket from '../../../../core/services/routes/emitter'
import VoiceCampaign from '../../models/voice_campaign'
import { getRecipients } from '../recipients'
import moment from 'moment'

const scheduleCalls = async (req, { voice_campaign_id }) => {

  const voice_campaign = await VoiceCampaign.query(qb => {
    qb.where('id', voice_campaign_id)
  }).fetch({
    transacting: req.trx
  })

  const recipients = await getRecipients(req, {
    type: 'voice',
    program_id: voice_campaign.get('program_id'),
    purpose: voice_campaign.get('purpose'),
    criteria: voice_campaign.get('to').criteria
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

  await socket.refresh(req, [
    `/admin/crm/campaigns/voice/${voice_campaign.get('id')}`
  ])
}

export default scheduleCalls
