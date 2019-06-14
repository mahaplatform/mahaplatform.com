import { updateRelated } from '../../../../../core/services/routes/relations'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import UserSerializer from '../../../serializers/user_serializer'
import socket from '../../../../../core/services/routes/emitter'
import User from '../../../../maha/models/user'

const updateRoute = async (req, res) => {

  const user = await User.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!user) return req.status(404).respond({
    code: 404,
    message: 'Unable to load user'
  })

  await user.save(whitelist(req.body, ['first_name','last_name','email','secondary_email','is_active','email_notification_method','photo_id','values']), {
    transacting: req.trx
  })

  await updateRelated(req, {
    object: user,
    related: 'roles',
    table: 'maha_users_roles',
    ids: req.body.role_ids,
    primary_key: 'user_id',
    foreign_key: 'role_id'
  })

  await updateRelated(req, {
    object: user,
    related: 'groups',
    table: 'maha_users_groups',
    ids: req.body.group_ids,
    primary_key: 'user_id',
    foreign_key: 'group_id'
  })

  await updateRelated(req, {
    object: user,
    related: 'supervisors',
    table: 'maha_supervisions',
    ids: req.body.supervisor_ids,
    primary_key: 'employee_id',
    foreign_key: 'supervisor_id'
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

  res.status(200).respond(user, (user) => {
    return UserSerializer(req, user)
  })

}

export default updateRoute
