import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import Role from '@apps/maha/models/role'

const destroyRoute = async (req, res) => {

  const role = await Role.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['apps','rights','users.photo'],
    transacting: req.trx
  })

  if(!role) return res.status(404).respond({
    code: 404,
    message: 'Unable to load role'
  })

  await req.trx('maha_roles_apps').where('role_id', role.get('id')).delete()

  await req.trx('maha_roles_rights').where('role_id', role.get('id')).delete()

  await req.trx('maha_users_roles').where('role_id', role.get('id')).delete()

  const channels = [
    '/admin/team/roles',
    `/admin/team/roles/${role.get('id')}`
  ]

  await activity(req, {
    story: 'deleted {object}',
    object: role
  })

  await role.destroy({
    transacting: req.trx
  })

  await socket.refresh(req, channels)

  res.status(200).respond(true)

}

export default destroyRoute
