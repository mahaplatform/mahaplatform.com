import { sendMail } from '@core/services/email'
import pluralize from 'pluralize'
import moment from 'moment'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const messageTemplate = fs.readFileSync(path.resolve(__dirname,'..','emails','notification_email','html.ejs')).toString()

const envelopeTemplate = fs.readFileSync(path.resolve(__dirname,'..','emails','envelope.ejs')).toString()

export const sendNotificationEmail = async (user, notifications) => {

  const content = ejs.render(messageTemplate, {
    email_notifications_method: user.get('email_notifications_method'),
    first_name: user.get('first_name'),
    host: process.env.WEB_HOST,
    notifications,
    pluralize,
    moment,
    _
  })

  const subject = 'Here\'s what you\'ve missed!'

  const html = ejs.render(envelopeTemplate, {
    host: process.env.WEB_HOST,
    maha: true,
    content,
    subject,
    moment,
    _
  })

  await sendMail({
    from: 'Maha <mailer@mahaplatform.com>',
    to: user.get('rfc822'),
    subject,
    html,
    list: {
      unsubscribe: {
        url: `${process.env.WEB_HOST}#preferences`,
        comment: 'Unsubscribe'
      }
    }
  })

}
