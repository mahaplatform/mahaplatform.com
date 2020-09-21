import collectObjects from '../../../core/utils/collect_objects'
import { sendMail } from '../../../core/services/email'
import Queue from '../../../core/objects/queue'
import Account from '../models/account'
import pluralize from 'pluralize'
import numeral from 'numeral'
import moment from 'moment'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const envelopePath = path.resolve(__dirname, '..', 'emails', 'envelope.ejs')

const envelopeTemplate = fs.readFileSync(envelopePath, 'utf8')

const emails = collectObjects('emails/*/index.js')

const templates = emails.reduce((emails, email) => ({
  ...emails,
  [`${email.config.code}:${email.default.code}`]: {
    subject: email.default.subject,
    envelope: email.default.envelope,
    html: fs.readFileSync(path.join(email.filepath, 'html.ejs'), 'utf8')
  }
}), {})

const processor = async (req, job) => {

  const { account_id, code } = job.data

  const template = templates[code]

  const account = await Account.where({
    id: account_id
  }).fetch({
    transacting: req.trx
  })

  const data = {
    moment,
    numeral,
    pluralize,
    host: process.env.WEB_HOST,
    maha: true,
    ...job.data.data || {}
  }

  const innerContent = ejs.render(template.html, data)

  const subject = ejs.render(template.subject, data)

  const html = template.envelope !== null ? ejs.render(envelopeTemplate, { ...data, subject, content: innerContent}) : innerContent

  await sendMail({
    from: 'Maha <mailer@mahaplatform.com>',
    to: account.get('rfc822'),
    subject,
    html
  })

}

const SendAlertQueue = new Queue({
  name: 'send_alert',
  processor
})

export default SendAlertQueue
