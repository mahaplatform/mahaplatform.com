import { sendMail } from '@core/services/email'
import Queue from '@core/objects/queue'
import { encodeEmail } from '../services/emails'
import Email from '../models/email'

const processor = async (req, job) => {

  const email = await Email.where({
    id: job.data.id
  }).fetch({
    transacting: req.trx
  })

  const encoded = await encodeEmail(req, {
    html: email.get('html'),
    code: email.get('code')
  })

  const result = await sendMail({
    from: email.get('from'),
    to: email.get('to'),
    reply_to: email.get('reply_to') || 'no-reply@mahaplatform.com',
    subject: email.get('subject'),
    html: encoded
  })

  await email.save(result, {
    patch: true,
    transacting: req.trx
  })

}

const MailerQueue = new Queue({
  name: 'send_email',
  processor
})

export default MailerQueue
