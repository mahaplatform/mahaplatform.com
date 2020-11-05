import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import { sendMail } from '@core/services/email'
import Email from '../../../../../maha/models/email'

const resendRoute = async (req, res) => {

  const email = await Email.where({
    id: req.params.id
  }).fetch({
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  await sendMail({
    from: email.get('from'),
    to: email.get('to'),
    reply_to: email.get('reply_to') || 'no-reply@mahaplatform.com',
    subject: email.get('subject'),
    html: email.get('html')
  })

  await activity(req, {
    story: 'resent {object}',
    object: email
  })

  await socket.refresh(req, [
    `/admin/team/emails/${email.get('id')}`
  ])

  res.status(200).respond(true)

}

export default resendRoute
