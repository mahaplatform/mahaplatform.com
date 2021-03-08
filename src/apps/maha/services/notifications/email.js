import { sendMail } from '@core/services/email'
import moment from 'moment'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const messageTemplate = fs.readFileSync(path.resolve(__dirname,'..','..','emails','notification_email','html.ejs')).toString()

const envelopeTemplate = fs.readFileSync(path.resolve(__dirname,'..','..','emails','envelope.ejs')).toString()

export const sendNotificationEmail = async (req, { digest }) => {

  const content = ejs.render(messageTemplate, {
    account: digest.account,
    host: process.env.WEB_HOST,
    teams: digest.teams,
    moment
  })

  const subject = 'Here\'s what you\'ve missed!'

  const html = ejs.render(envelopeTemplate, {
    host: process.env.WEB_HOST,
    maha: true,
    content,
    subject,
    moment
  })


  await sendMail({
    from: 'Maha <mailer@mahaplatform.com>',
    to: digest.account.get('rfc822'),
    subject: 'Here\'s what you\'ve missed!',
    html
  })

}
