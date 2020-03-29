import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import EmailSerializer from '../../../serializers/email_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Email from '../../../models/email'

const updateRoute = async (req, res) => {

  const email = await Email.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  await email.save({
    ...whitelist(req.body, ['title','config'])
  }, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'updated',
    auditable: email
  })

  await activity(req, {
    story: 'updated {object}',
    object: email
  })

  await socket.refresh(req, [
    '/admin/crm/emails',
    `/admin/crm/emails/${email.id}`
  ])

  res.status(200).respond(email, EmailSerializer)

}

export default updateRoute
