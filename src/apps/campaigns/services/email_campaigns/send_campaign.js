import TriggerEmailEnrollmentQueue from '../../queues/trigger_email_enrollment_queue'
import { renderEmail } from '@apps/automation/services/email'
import { getRecipients } from '../../services/recipients'
import EmailCampaign from '../../models/email_campaign'
import moment from 'moment'

const sendCampaign = async (req, { email_campaign_id, resend_to }) => {

  const email_campaign = await EmailCampaign.query(qb => {
    qb.where('id', email_campaign_id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  const recipients = await getRecipients(req, {
    type: 'email',
    program_id: email_campaign.related('program').get('id'),
    purpose: email_campaign.get('purpose'),
    ...resend_to || email_campaign.get('to') || {}
  }).then(result => result.toArray())

  if(!resend_to) {
    const html = await renderEmail(req, {
      config: email_campaign.get('config')
    })

    await email_campaign.save({
      sent_at: moment(),
      status: 'sent',
      html
    }, {
      transacting: req.trx,
      patch: true
    })
  }

  await Promise.map(recipients, async (recipient) => {
    await TriggerEmailEnrollmentQueue.enqueue(req, {
      email_campaign_id: email_campaign.get('id'),
      email_address_id: recipient.get('email_address_id')
    })
  })

}

export default sendCampaign
