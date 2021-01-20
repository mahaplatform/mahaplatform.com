import { personalizeEmail } from '@apps/automation/services/email'
import generateCode from '@core/utils/generate_code'
import EmailAddress from '@apps/crm/models/email_address'
import { encodeEmail } from '@apps/maha/services/emails'
import { sendMail } from '@core/services/email'
import EmailCampaign from '@apps/campaigns/models/email_campaign'
import Contact from '@apps/crm/models/contact'
import Sender from '@apps/crm/models/sender'
import Email from '@apps/maha/models/email'
import Field from '@apps/maha/models/field'
import _ from 'lodash'

const sendEmail = async (req, params) => {

  const { email_campaign_id, email_address_id } = params

  const email_address = await EmailAddress.query(qb => {
    qb.where('id', email_address_id)
  }).fetch({
    transacting: req.trx
  })

  const contact = await Contact.query(qb => {
    qb.select('crm_contacts.*','crm_contact_primaries.*')
    qb.innerJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    qb.where('id', email_address.get('contact_id'))
  }).fetch({
    transacting: req.trx
  })

  const campaign = await EmailCampaign.query(qb => {
    qb.where('id', email_campaign_id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  const program = campaign.related('program')

  const fields = await Field.query(qb => {
    qb.where('parent_type', 'crm_programs')
    qb.where('parent_id', program.get('id'))
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const values = contact.get('values')

  const programvalues = fields.reduce((programvalues, field) => ({
    ...programvalues,
    [field.get('name').token]: _.get(values, `${field.get('code')}[0]`)
  }), {})

  const config = campaign.get('config')

  const sender = await Sender.query(qb => {
    qb.where('id', config.settings.sender_id)
  }).fetch({
    transacting: req.trx
  })

  const code = await generateCode(req, {
    table: 'maha_emails'
  })

  const data = {
    contact: {
      full_name: contact.get('full_name'),
      first_name: contact.get('first_name'),
      last_name: contact.get('last_name'),
      email: contact.get('email'),
      phone: contact.get('phone'),
      address: contact.get('address') ? contact.get('address').description : null,
      birthday: contact.get('birthday'),
      spouse: contact.get('spouse')
    },
    program: programvalues,
    email: {
      facebook_link: `${process.env.WEB_HOST}/so/fb/${code}`,
      twitter_link: `${process.env.WEB_HOST}/so/tw/${code}`,
      forward_link: `${process.env.WEB_HOST}/fo/${code}`,
      linkedin_link: `${process.env.WEB_HOST}/so/li/${code}`,
      pinterest_link: `${process.env.WEB_HOST}/so/pi/${code}`,
      web_link: `${process.env.WEB_HOST}/wv/${code}`,
      preferences_link: `${process.env.WEB_HOST}/crm/p${code}${email_address.get('code')}`
    }
  }

  const rendered = personalizeEmail(req, {
    subject: config.settings.subject,
    html: campaign.get('html'),
    data
  })

  const email = await Email.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    email_campaign_id: campaign.get('id'),
    email_address_id: email_address.get('id'),
    from: sender.get('rfc822'),
    reply_to: config.settings.reply_to,
    to: contact.get('rfc822'),
    cc: config.settings.cc,
    bcc: config.settings.bcc,
    code,
    data,
    was_bounced: false,
    was_clicked: false,
    was_complained: false,
    was_delivered: false,
    was_opened: false,
    was_unsubscribed: false,
    was_webviewed: false
  }).save(null, {
    transacting: req.trx
  })

  const encoded = await encodeEmail(req, {
    html: rendered.html,
    code
  })

  const result = await sendMail({
    from: email.get('from'),
    to: email.get('to'),
    cc: email.get('cc'),
    bcc: email.get('bcc'),
    reply_to: email.get('reply_to') || 'no-reply@mahaplatform.com',
    subject: rendered.subject,
    html: encoded
  })

  await email.save(result, {
    patch: true,
    transacting: req.trx
  })

}

export default sendEmail
