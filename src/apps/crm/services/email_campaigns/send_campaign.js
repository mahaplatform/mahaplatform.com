import TriggerEmailEnrollmentQueue from '../../queues/trigger_email_enrollment_queue'
import { getRecipients } from '../../services/recipients'
import EmailCampaign from '../../models/email_campaign'
import { renderEmail } from '../../services/email'
import moment from 'moment'

const sendCampaign = async (req, { email_campaign_id, resend_to }) => {

  const campaign = await EmailCampaign.query(qb => {
    qb.where('id', email_campaign_id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  const recipients = await getRecipients(req, {
    type: 'email',
    program_id: campaign.related('program').get('id'),
    purpose: campaign.get('purpose'),
    criteria: resend_to || campaign.get('to').criteria
  }).then(result => result.toArray())

  if(!resend_to) {
    const html = await renderEmail(req, {
      config: campaign.get('config')
    })

    await campaign.save({
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
      email_campaign_id: campaign.get('id'),
      email_address_id: recipient.get('email_address_id')
    })
  })

}

export default sendCampaign
