import htmlToText from 'html-email-to-text'
import nodemailer from './nodemailer'
import inline from 'inline-css'
import moment from 'moment'

export const sendMail = async (email) => {

  const html = await inline(email.html, {
    url: process.env.WEB_HOST,
    preserveMediaQueries: true
  })

  if(process.env.EMAIL_DELIVERY !== 'ses') return

  const result = await new Promise((resolve, reject) => {
    nodemailer.sendMail({
      ...email,
      to: process.env.EMAIL_REDIRECT || email.to,
      html,
      text: htmlToText(email.html)
    }, async (err, info) => {
      if(err) reject(err)
      resolve(info)
    })
  })

  return {
    ses_id: result.response,
    sent_at: moment()
  }

}
