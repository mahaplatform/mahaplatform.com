import TriggerSmsEnrollmentQueue from '@apps/campaigns/queues/trigger_sms_enrollment_queue'
import SmsCampaign from '@apps/campaigns/models/sms_campaign'
import { getRecipients } from '../recipients'
import moment from 'moment'

const sendCampaign = async (req, { sms_campaign_id, resend_to }) => {

  const sms_campaign = await SmsCampaign.query(qb => {
    qb.where('id', sms_campaign_id)
  }).fetch({
    transacting: req.trx
  })

  const recipients = await getRecipients(req, {
    type: 'sms',
    program_id: sms_campaign.get('program_id'),
    purpose: sms_campaign.get('purpose'),
    ...resend_to || sms_campaign.get('to') || {}
  }).then(result => result.toArray())

  await sms_campaign.save({
    sent_at: moment(),
    status: 'sent'
  }, {
    transacting: req.trx,
    patch: true
  })

  await Promise.map(recipients, async (recipient) => {
    await TriggerSmsEnrollmentQueue.enqueue(req, {
      sms_campaign_id: sms_campaign.get('id'),
      phone_number_id: recipient.get('phone_number_id'),
      contact_id: recipient.get('contact_id')
    })
  })

}

export default sendCampaign
