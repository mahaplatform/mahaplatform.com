import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'
import Role from '../../../../maha/models/role'

const destroyRoute = async (req, res) => {

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

  await knex('maha_roles_apps').transacting(req.trx).where({
    role_id: role.get('id')
  }).del()

  await knex('maha_roles_rights').transacting(req.trx).where({
    role_id: role.get('id')
  }).del()

  await knex('maha_users_roles').transacting(req.trx).where({
    role_id: role.get('id')
  }).del()

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
