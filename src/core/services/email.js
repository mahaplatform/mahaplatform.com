import nodemailer from '../vendor/nodemailer'
import inline from 'inline-css'
import moment from 'moment'

export const sendMail = async (email) => {

  const html = await inline(email.html, {
    url: process.env.ADMIN_HOST,
    preserveMediaQueries: true
  })

  if(process.env.EMAIL_DELIVERY !== 'ses') return

  const result = await new Promise((resolve, reject) => {
    nodemailer.sendMail({
      ...email,
      from: process.env.EMAIL_SENDER || email.from,
      to: process.env.EMAIL_REDIRECT || email.to,
      cc: email.cc ? (process.env.EMAIL_REDIRECT || email.cc) : null,
      bcc: email.bcc ? (process.env.EMAIL_REDIRECT || email.bcc) : null,
      html
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
