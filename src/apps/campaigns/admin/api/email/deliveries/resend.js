import { activity } from '@core/services/routes/activities'
import { personalizeEmail } from '@apps/automation/services/email'
import socket from '@core/services/routes/emitter'
import { sendMail } from '@core/services/email'
import Email from '@apps/maha/models/email'

const resendRoute = async (req, res) => {

  const email = await Email.where({
    id: req.params.id
  }).fetch({
    withRelated: ['email_campaign'],
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  const campaign = email.related('email_campaign')

  const personalized = personalizeEmail(req, {
    subject: campaign.get('config').settings.subject,
    html: campaign.get('html'),
    data: email.get('data')
  })

  await sendMail({
    from: email.get('from'),
    to: email.get('to'),
    reply_to: email.get('reply_to') || 'no-reply@mahaplatform.com',
    subject: personalized.subject,
    html: personalized.html
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
