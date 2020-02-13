import generateCode from '../../../core/utils/generate_code'
import { getRecipients } from '../services/email_campaigns'
import EmailCampaign from '../models/email_campaign'
import Queue from '../../../core/objects/queue'
import Email from '../../maha/models/email'

const processor = async (job, trx) => {

  const req = { trx }

  const { id } = job.data

  const campaign = await EmailCampaign.query(qb => {
    qb.where('id', id)
  }).fetch({
    transacting: req.trx
  })

  const config = campaign.get('config')

  const contacts = await getRecipients(req, {
    to: campaign.get('to')
  }).then(result => result.toArray())

  const sender = await Sender.query(qb => {
    qb.where('id', config.settings.sender_id)
  }).fetch({
    transacting: req.trx
  })

  await Promise.map(contacts, async (contact) => {

    const code = await generateCode(req, {
      table: 'maha_emails'
    })

    const rendered = renderEmail(req, {
      config,
      subject: config.settings.subject,
      data: {
        contact: {
          full_name: contact.get('full_name'),
          first_name: contact.get('first_name'),
          last_name: contact.get('last_name'),
          email: contact.get('email')
        },
        email: {
          web_link: `${process.env.WEB_HOST}/w${code}`,
          preferences_link: `${process.env.WEB_HOST}/crm/preferences/email/${program.get('code')}${email_address.get('code')}`
        }
      }
    })

    const email = await Email.forge({
      team_id: req.team.get('id'),
      contact_id: contact.get('id'),
      email_id: form.related('email').get('id'),
      from: sender.get('rfc822'),
      reply_to: config.settings.reply_to,
      to: contact.get('rfc822'),
      subject: rendered.subject,
      html: rendered.html,
      code
    }).save(null, {
      transacting: req.trx
    })

    await SendEmailCampaignEmailQueue.enqueue({ trx }, {
    })

  })

  await campaign.save({
    status: 'sent'
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
