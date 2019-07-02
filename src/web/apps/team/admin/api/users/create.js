import { updateRelated } from '../../../../../core/services/routes/relations'
import { activity } from '../../../../../core/services/routes/activities'
import { createUserToken } from '../../../../../core/utils/user_tokens'
import { whitelist } from '../../../../../core/services/routes/params'
import generateCode from '../../../../../core/utils/generate_code'
import UserSerializer from '../../../serializers/user_serializer'
import socket from '../../../../../core/services/routes/emitter'
import mailer from '../../../../maha/queues/mailer_queue'
import User from '../../../../maha/models/user'

const createRoute = async (req, res) => {

  const user = await User.forge({
    team_id: req.team.get('id'),
    is_active: false,
    notifications_enabled: true,
    in_app_notifications_enabled: true,
    notification_sound_enabled: true,
    notification_sound: 'ding',
    push_notifications_enabled: true,
    mute_evenings: true,
    mute_evenings_start_time: '18:00',
    mute_evenings_end_time: '9:00',
    mute_weekends: true,
    values: {},
    key: generateCode(32),
    ...whitelist(req.body, ['first_name','last_name','email','secondary_email','is_active','email_notification_method','photo_id','values'])
  }).save(null, {
    transacting: req.trx
  })

  await updateRelated(req, {
    object: user,
    related: 'roles',
    table: 'maha_users_roles',
    ids: req.body.role_ids,
    foreign_key: 'user_id',
    related_foreign_key: 'role_id'
  })

  await updateRelated(req, {
    object: user,
    related: 'groups',
    table: 'maha_users_groups',
    ids: req.body.group_ids,
    foreign_key: 'user_id',
    related_foreign_key: 'group_id'
  })

  await updateRelated(req, {
    object: user,
    related: 'supervisors',
    table: 'maha_supervisions',
    ids: req.body.supervisor_ids,
    foreign_key: 'employee_id',
    related_foreign_key: 'supervisor_id'
  })

  await activity(req, {
    story: 'created {object}',
    object: user
  })

  const token = createUserToken(user, 'activation_id')

  await mailer.enqueue(req, {
    team_id: req.team.get('id'),
    user,
    template: 'team:activation',
    data: {
      first_name: user.get('first_name'),
      activation_url: `${process.env.WEB_HOST}/admin/activate/${token}`
    }
  })

  await socket.refresh(req, [
    '/admin/team/users'
  ])

  res.status(200).respond(user, UserSerializer)

}

export default createRoute
