import { Route, Installation, Right, Role } from 'maha'

const activity = (req, trx, object, options) => ({
  story: 'uninstalled {object}',
  object
})

const processor = async (req, trx, options) => {

  const app_id = req.params.id

  const team_id = req.team.get('id')

  const installation = await Installation.where({
    app_id,
    team_id
  }).fetch({ transacting: trx })

  if(!installation) return true

  const roles = await Role.where({ team_id }).fetchAll({ transacting: trx })

  if(roles) {

    const role_ids = roles.map(role => role.id)

    await options.knex('maha_roles_apps').transacting(trx).where({ app_id }).whereIn('role_id', role_ids).delete()

    const rights = await Right.where({ app_id }).fetchAll({ transacting: trx })

    if(rights) {

      const right_ids = rights.map(right => right.id)

      await options.knex('maha_roles_rights').transacting(trx).whereIn('right_id', right_ids).whereIn('role_id', role_ids).delete()

    }

  }

  await Installation.where({
    app_id,
    team_id
  }).destroy({ transacting: trx })

  return installation

}

const refresh = (req, trx, result, options) => ({
  channel: 'team',
  target: [
    '/admin/team/apps',
    `/admin/team/apps/${req.params.id}`
  ]
})

const messages = (req, trx, result, options) => ({
  channel: 'team',
  action: 'session'
})

const uninstallRoute = new Route({
  activity,
  messages,
  method: 'get',
  path: '/uninstall',
  processor,
  refresh
})

export default uninstallRoute
