import { updateRelated } from '@core/services/routes/relations'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import RoleSerializer from '@apps/team/serializers/role_serializer'
import socket from '@core/services/routes/emitter'
import Role from '@apps/maha/models/role'

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
    foreign_key: 'role_id',
    related_foreign_key: 'app_id'
  })

  await updateRelated(req, {
    object: role,
    related: 'rights',
    table: 'maha_roles_rights',
    ids: req.body.assignments.right_ids,
    foreign_key: 'role_id',
    related_foreign_key: 'right_id'
  })

  await activity(req, {
    story: 'created {object}',
    object: role
  })

  await socket.refresh(req, [
    '/admin/team/roles'
  ])

  await res.status(200).respond(role, RoleSerializer)

}

export default createRoute
