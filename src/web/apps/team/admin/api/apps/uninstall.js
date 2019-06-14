import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import Installation from '../../../../maha/models/installation'
import knex from '../../../../../core/services/knex'
import Right from '../../../../maha/models/right'
import Role from '../../../../maha/models/role'

const uninstallRoute = async (req, res) => {

  const installation = await Installation.where({
    app_id: req.params.id,
    team_id: req.team.get('id')
  }).fetch({
    transacting: req.trx
  })

  if(!installation) return true

  const roles = await Role.where({
    team_id: req.team.get('id')
  }).fetchAll({
    transacting: req.trx
  })

  if(roles) {

    const role_ids = roles.map(role => role.id)

    await knex('maha_roles_apps').transacting(req.trx).where({
      app_id: req.params.id
    }).whereIn('role_id', role_ids).delete()

    const rights = await Right.where({
      app_id: req.params.id
    }).fetchAll({
      transacting: req.trx
    })

    if(rights) {

      const right_ids = rights.map(right => right.id)

      await knex('maha_roles_rights').transacting(req.trx).whereIn('right_id', right_ids).whereIn('role_id', role_ids).delete()

    }

  }


  await Installation.where({
    app_id: req.params.id,
    team_id: req.team.get('id')
  }).fetch({
    transacting: req.trx
  })

  await activity(req, {
    story: 'uninstalled {object}',
    object: installation
  })

  await socket.refresh(req, {
    channel: 'team',
    target: [
      '/admin/team/apps',
      `/admin/team/apps/${req.params.id}`
    ]
  })

  res.status(200).respond(true)

}

export default uninstallRoute
