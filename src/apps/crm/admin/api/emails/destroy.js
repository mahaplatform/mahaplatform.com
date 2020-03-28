import { activity } from '../../../../../core/services/routes/activities'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Email from '../../../models/email'
import moment from 'moment'

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

  await email.save({
    deleted_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await audit(req, {
    story: 'deleted',
    auditable: email
  })

  await activity(req, {
    story: 'deleted {object}',
    object: email
  })

  await socket.refresh(req, [
    '/admin/crm/emails',
    `/admin/crm/emails/${email.id}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
