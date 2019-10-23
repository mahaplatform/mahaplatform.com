import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import SenderSerializer from '../../../../serializers/sender_serializer'
import socket from '../../../../../../core/services/routes/emitter'
import ses from '../../../../../../core/services/ses'
import Sender from '../../../../models/sender'

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

    await ses.setIdentityNotificationTopic({
      Identity: req.body.email,
      NotificationType: 'Bounce',
      SnsTopic: 'arn:aws:sns:us-east-1:927906310648:mahaplatform-bounces'
    }).promise()

    await ses.setIdentityNotificationTopic({
      Identity: req.body.email,
      NotificationType: 'Complaint',
      SnsTopic: 'arn:aws:sns:us-east-1:927906310648:mahaplatform-complaints'
    }).promise()

    await ses.setIdentityNotificationTopic({
      Identity: req.body.email,
      NotificationType: 'Delivery',
      SnsTopic: 'arn:aws:sns:us-east-1:927906310648:mahaplatform-deliveries'
    }).promise()
  }

  const sender = await Sender.forge({
    team_id: req.team.get('id'),
    program_id: req.params.program_id,
    is_verified: false,
    ...whitelist(req.body, ['name','email'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: sender
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}`
  ])

  res.status(200).respond(sender, SenderSerializer)

}

export default createRoute
