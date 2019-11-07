import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import SenderSerializer from '../../../../serializers/sender_serializer'
import socket from '../../../../../../core/services/routes/emitter'
import ses from '../../../../../../core/services/ses'
import Program from '../../../../models/program'
import Sender from '../../../../models/sender'

const createRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.whereIn('crm_program_user_access.type', ['manage','edit'])
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', req.params.program_id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

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
    program_id: program.get('id'),
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
