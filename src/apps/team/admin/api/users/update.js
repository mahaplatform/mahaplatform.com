import { updateRelated } from '@core/services/routes/relations'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import UserSerializer from '@apps/team/serializers/user_serializer'
import socket from '@core/services/routes/emitter'
import User from '@apps/maha/models/user'

const updateRoute = async (req, res) => {

  const user = await User.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!user) return res.status(404).respond({
    code: 404,
    message: 'Unable to load user'
  })

  await user.save(whitelist(req.body, ['email_notifications_method','values']), {
    patch: true,
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
    story: 'updated {object}',
    object: user
  })

  await socket.message(req, {
    channel: `/admin/users/${user.get('id')}`,
    action: 'session'
  })

  await socket.refresh(req, [
    '/admin/team/users',
    `/admin/team/users/${user.get('id')}`
  ])

  await res.status(200).respond(user, UserSerializer)

}

export default updateRoute
