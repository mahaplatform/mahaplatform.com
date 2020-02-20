import SendEmailCampaignEmailQueue from './send_email_campaign_email_queue'
import { getRecipients } from '../services/recipients'
import EmailCampaign from '../models/email_campaign'
import Queue from '../../../core/objects/queue'
import { renderEmail } from '../services/email'
import moment from 'moment'

const processor = async (req, job) => {

  const { id } = job.data

  const campaign = await EmailCampaign.query(qb => {
    qb.where('id', id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  const contacts = await getRecipients(req, {
    type: 'email',
    program_id: campaign.related('program').get('id'),
    purpose: campaign.get('purpose'),
    criteria: campaign.get('to').criteria
  }).then(result => result.toArray())

  const html = renderEmail(req, {
    config: campaign.get('config')
  })

  await campaign.save({
    sent_at: moment(),
    status: 'sending',
    html
  }, {
    transacting: req.trx,
    patch: true
  })

  await Promise.map(contacts, async (contact) => {
    await SendEmailCampaignEmailQueue.enqueue(req, {
      email_campaign_id: campaign.get('id'),
      email_address_id: contact.related('email_address').get('id')
    })
  })

}

const SendEmailCampaignQueue = new Queue({
  name: 'send_email_campaign',
  processor
})

export default SendEmailCampaignQueue
