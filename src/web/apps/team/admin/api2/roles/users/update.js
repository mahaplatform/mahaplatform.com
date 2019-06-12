import { updateRelated } from '../../../../../../core/services/routes/relations'
import socket from '../../../../../../core/services/routes/emitter'
import Role from '../../../../../maha/models/role'

const updateRoute = async (req, res) => {

  const role = await Role.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!role) return req.status(404).respond({
    code: 404,
    message: 'Unable to load role'
  })

  await updateRelated(req, {
    object: role,
    related: 'users',
    table: 'maha_users_roles',
    ids: req.body.assignments.map(assignment => assignment.user_id),
    primary_key: 'role_id',
    foreign_key: 'user_id'
  })

  await socket.refresh(req, [
    `/admin/team/roles/${req.params.id}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
