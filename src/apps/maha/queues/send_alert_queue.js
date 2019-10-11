import collectObjects from '../../../core/utils/collect_objects'
import { sendMail } from '../../../core/services/email'
import Queue from '../../../core/objects/queue'
import User from '../models/user'
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

const processor = async (job, trx) => {

  const { user_id, code } = job.data

  const template = templates[code]

  const user = await User.where({
    id: user_id
  }).fetch({
    withRelated: ['team.logo'],
    transacting: trx
  })

  const team = user.related('team').toJSON()

  const data = {
    moment,
    numeral,
    pluralize,
    team,
    host: process.env.WEB_HOST,
    ...job.data.data || {}
  }

  const innerContent = ejs.render(template.html, data)

  const html = template.envelope !== null ? ejs.render(envelopeTemplate, { ...data, content: innerContent}) : innerContent

  await sendMail({
    from: 'Maha <mailer@mahaplatform.com>',
    to: user.get('rfc822'),
    subject: ejs.render(template.subject, data),
    html,
    list: {
      unsubscribe: {
        url: `${process.env.WEB_HOST}#preferences`,
        comment: 'Unsubscribe'
      }
    }
  })

}

const sendAlertQueue = new Queue({
  name: 'send_alert',
  enqueue: async (req, job) => job,
  processor
})

export default sendAlertQueue
