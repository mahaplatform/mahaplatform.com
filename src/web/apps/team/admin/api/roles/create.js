import { updateRelated } from '../../../../../core/services/routes/relations'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import RoleSerializer from '../../../serializers/role_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Role from '../../../../maha/models/role'

const createRoute = async (req, res) => {

  const role = await Role.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['title','description'])
  }).save(null, {
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
    story: 'created {object}',
    object: role
  })
  
  await socket.refresh(req, [
    '/admin/team/roles'
  ])

  res.status(200).respond(role, (role) => {
    return RoleSerializer(req, role)
  })

}

export default createRoute
