import SendEmailCampaignEmailQueue from './send_email_campaign_email_queue'
import { getRecipients } from '../services/recipients'
import EmailCampaign from '../models/email_campaign'
import Queue from '../../../core/objects/queue'

const processor = async (job, trx) => {

  const req = { trx }

  const { id } = job.data

  const campaign = await EmailCampaign.query(qb => {
    qb.where('id', id)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = campaign.related('team')

  const contacts = await getRecipients(req, {
    filter: campaign.get('to')
  }).then(result => result.toArray())

  await Promise.map(contacts, async (contact) => {

    const email_address = contact.related('email_addresses').toArray().shift()

    await SendEmailCampaignEmailQueue.enqueue(req, {
      email_campaign_id: campaign.get('id'),
      email_address_id: email_address.get('id')
    })

  })

  await campaign.save({
    status: 'sending'
  }, {
    transacting: req.trx,
    patch: true
  })

}

const failed = async (job, err) => {}

const SendEmailCampaignQueue = new Queue({
  name: 'send_email_campaign',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default SendEmailCampaignQueue
