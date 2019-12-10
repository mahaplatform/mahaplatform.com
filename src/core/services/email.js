import htmlToText from 'html-email-to-text'
import nodemailer from './nodemailer'
import inline from 'inline-css'
import moment from 'moment'

export const sendMail = async (email) => {

  const html = await inline(email.html, {
    url: process.env.WEB_HOST,
    preserveMediaQueries: true
  })

  const rendered = {
    ...email,
    to: process.env.EMAIL_REDIRECT || email.to,
    html,
    text: htmlToText(email.html)
  }

  try {

    // if(process.env.EMAIL_DELIVERY === 'console') return await _sendViaConsole(rendered)

    if(process.env.EMAIL_DELIVERY === 'ses') return await _sendViaSES(rendered)

  } catch(err) {

    return { error: err.message }

  }

}

const _sendViaConsole = async (rendered) => {

  const output = [
    Array(86).join('-'),
    `TO: ${rendered.to}`,
    `SUBJECT: ${rendered.subject}`,
    Array(86).join('-'),
    rendered.text,
    Array(86).join('-')
  ]

  console.mail(output.join('\n'))

  return { sent_at: moment() }

}

const _sendViaSES = async (rendered) => {

  const result = await new Promise((resolve, reject) => {

    nodemailer.sendMail(rendered, async (err, info) => {

      if(err) reject(err)

      resolve(info)

    })


  })

  return { ses_id: result.response, sent_at: moment() }

}
