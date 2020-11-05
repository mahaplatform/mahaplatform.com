import { sendMail } from '@core/services/email'
import request from 'request-promise'
import moment from 'moment'

const createRoute = async (req, res) => {

  const { filename, format, message, subject, to, url } = req.body

  const host = 'https://mahaplatform.com'

  const timestamp = moment().format('YYYYMMDDHHmmss')

  const result = await request.get({
    url: `${host}${url}&token=${req.token}`,
    encoding: null,
    rejectUnauthorized: false
  }).promise()

  await sendMail({
    from: req.team.get('rfc822'),
    to,
    subject,
    html: message,
    attachments: [{
      filename: `${filename}-${timestamp}.${format}`,
      content: Buffer.from(result, 'utf8')
    }]
  })

  res.status(200).respond(true)

}

export default createRoute
