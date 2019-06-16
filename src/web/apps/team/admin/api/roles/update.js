import { updateRelated } from '../../../../../core/services/routes/relations'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import RoleSerializer from '../../../serializers/role_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Role from '../../../../maha/models/role'

const updateRoute = async (req, res) => {

  const role = await Role.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['apps','rights','users.photo'],
    transacting: req.trx
  })

  if(!role) return res.status(404).respond({
    code: 404,
    message: 'Unable to load role'
  })

  await role.save(whitelist(req.body, ['title','description']), {
    transacting: req.trx
  })

  await updateRelated(req, {
    object: role,
    related: 'apps',
    table: 'maha_roles_apps',
    ids: req.body.assignments.app_ids,
    primary_key: 'role_id',
    foreign_key: 'app_id'
  })

  await updateRelated(req, {
    object: role,
    related: 'rights',
    table: 'maha_roles_rights',
    ids: req.body.assignments.right_ids,
    primary_key: 'role_id',
    foreign_key: 'right_id'
  })

  await activity(req, {
    story: 'updated {object}',
    object: role
  })

  await socket.message(req, role.related('users').map(user => ({
    channel: 'user',
    action: 'session'
  })))

  await socket.refresh(req, [
    '/admin/team/roles',
    `/admin/team/roles/${role.get('id')}`
  ])

  res.status(200).respond(role, RoleSerializer)

}

export default updateRoute
