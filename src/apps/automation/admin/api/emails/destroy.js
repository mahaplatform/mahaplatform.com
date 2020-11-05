import { activity } from '@core/services/routes/activities'
import { deleteEmail } from '../../../services/email'
import socket from '@core/services/routes/emitter'
import Email from '../../../models/email'

const destroyRoute = async (req, res) => {

  const email = await Email.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  await deleteEmail(req, {
    email
  })

  await activity(req, {
    story: 'deleted {object}',
    object: email
  })

  await socket.refresh(req, [
    '/admin/automation/emails',
    `/admin/automation/emails/${email.id}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
