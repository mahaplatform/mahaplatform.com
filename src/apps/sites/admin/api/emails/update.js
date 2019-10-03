import { activity } from '../../../../../core/services/routes/activities'
import EmailSerializer from '../../../serializers/email_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Email from '../../../models/email'

const updateRoute = async (req, res) => {

  const email = await Email.scope({
    team: req.team
  }).query(qb => {
    qb.where('site_id', req.params.site_id)
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  await activity(req, {
    story: 'updated {object}',
    object: email
  })

  await socket.refresh(req, [
    `/admin/sites/sites/${req.params.site_id}`
  ])

  res.status(200).respond(email, EmailSerializer)

}

export default updateRoute
