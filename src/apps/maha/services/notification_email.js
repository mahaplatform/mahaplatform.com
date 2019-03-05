import { sendMail } from '../core/services/email'
import pluralize from 'pluralize'
import moment from 'moment'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const messageTemplate = fs.readFileSync(path.resolve('src', 'apps', 'maha', 'emails', 'notification_email', 'html.ejs')).toString()

const envelopeTemplate = fs.readFileSync(path.resolve('src', 'apps', 'maha', 'core', 'templates', 'envelope.ejs')).toString()

const host = process.env.WEB_HOST

export const sendNotificationEmail = async (user, notifications) => {

  const content = ejs.render(messageTemplate, {
    email_notifications_method: user.get('email_notifications_method'),
    first_name: user.get('first_name'),
    host,
    moment,
    pluralize,
    notifications
  })

  const html = ejs.render(envelopeTemplate, {
    content,
    moment
  })

  await sendMail({
    from: 'Maha <mailer@mahaplatform.com>',
    to: user.get('rfc822'),
    subject: 'Here\'s what you\'ve missed!',
    html,
    list: {
      unsubscribe: {
        url: host+'#preferences',
        comment: 'Unsubscribe'
      }
    }
  })

}
