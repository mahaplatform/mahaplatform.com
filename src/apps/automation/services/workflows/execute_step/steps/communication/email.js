import { personalizeEmail, renderEmail } from '@apps/automation/services/email'
import AutomationEmail from '@apps/automation/models/email'
import EmailAddress from '@apps/crm/models/email_address'
import { sendEmail } from '@apps/maha/services/emails'
import generateCode from '@core/utils/generate_code'
import Sender from '@apps/crm/models/sender'
import { getNext } from '../utils'

const getAddress = (tokens) => {
  const { contact, order, registration, response} = tokens
  if(order && order.email) return order.email
  if(registration && registration.email) return registration.email
  if(response && response.email) return response.email
  if(contact && contact.email) return contact.email
  return null
}

const getEmailAddress = async (req, { contact, tokens }) => {

  const address = getAddress(tokens)

  if(!address) return null

  return await EmailAddress.query(qb => {
    qb.where('contact_id', contact.get('id'))
    qb.where('address', address.toLowerCase())
  }).fetch({
    transacting: req.trx
  })

}

const emailStep = async (req, { config, contact, state, step, tokens }) => {

  const email_address = await getEmailAddress(req, {
    contact,
    tokens
  })

  const automation_email = await AutomationEmail.query(qb => {
    qb.where('id', step.config.email_id)
  }).fetch({
    transacting: req.trx
  })

  const html = await renderEmail(req, {
    config: automation_email.get('config')
  })

  const settings = automation_email.get('config').settings

  const sender = await Sender.query(qb => {
    qb.where('id', settings.sender_id)
  }).fetch({
    transacting: req.trx
  })

  const code = await generateCode(req, {
    table: 'maha_emails'
  })

  const rendered = personalizeEmail(req, {
    subject: settings.subject,
    html,
    code,
    email_address,
    data: tokens
  })

  const email = await sendEmail(req, {
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    email_id: config.email_id,
    email_address_id: email_address.get('id'),
    from: sender.get('rfc822'),
    reply_to: settings.reply_to,
    to: contact.get('rfc822'),
    cc: settings.cc,
    bcc: settings.bcc,
    subject: rendered.subject,
    html: rendered.html,
    code
  })

  return {
    action: {
      email_id: email.get('id')
    },
    next: getNext(req, { config, state })
  }

}

export default emailStep
