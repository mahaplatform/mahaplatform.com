import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import Email from '@apps/maha/models/email'

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
