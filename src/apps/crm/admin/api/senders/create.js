import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import SenderSerializer from '../../../serializers/sender_serializer'
import socket from '../../../../../core/services/routes/emitter'
import ses from '../../../../../core/services/ses'
import Sender from '../../../models/sender'

const createRoute = async (req, res) => {

  const existing = await Sender.query(qb => {
    qb.where('email', req.body.email)
  }).fetch({
    transacting: req.trx
  })

  if(!existing) {
    await ses.sendCustomVerificationEmail({
      EmailAddress: req.body.email,
      TemplateName: 'maha_crm_safe_sender'
    }).promise()
  }

  const sender = await Sender.forge({
    team_id: req.team.get('id'),
    is_verified: false,
    ...whitelist(req.body, ['program_id','name','email'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: sender
  })

  await socket.refresh(req, [
    '/admin/crm/senders'
  ])

  res.status(200).respond(sender, SenderSerializer)

}

export default createRoute
