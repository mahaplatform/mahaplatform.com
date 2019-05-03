import { Route } from '../../../../../core/backframe'
import App from '../../../../maha/models/app'
import Right from '../../../../maha/models/right'

const processor = async (req, trx, options) => {

  const apps = await App.query(qb => {
    qb.select(options.knex.raw('distinct on (maha_apps.code) maha_apps.*, maha_users_roles.role_id is not null as installed'))
    qb.joinRaw('inner join maha_installations on maha_installations.app_id = maha_apps.id and maha_installations.team_id = ?', req.team.get('id'))
    qb.innerJoin('maha_roles_apps', 'maha_roles_apps.app_id', 'maha_apps.id')
    qb.joinRaw('left join maha_users_roles on maha_users_roles.role_id = maha_roles_apps.role_id and maha_users_roles.user_id = ?', req.resource.get('id'))
    qb.orderByRaw('maha_apps.code asc, maha_users_roles.role_id asc')
  }).fetchAll({ transacting: trx })

  const rights = await Right.query(qb => {
    qb.select(options.knex.raw('distinct on (maha_rights.code) maha_rights.*, maha_users_roles.role_id is not null as assigned'))
    qb.innerJoin('maha_roles_rights', 'maha_roles_rights.right_id', 'maha_rights.id')
    qb.joinRaw('left join maha_users_roles on maha_users_roles.role_id = maha_roles_rights.role_id and maha_users_roles.user_id = ?', req.resource.get('id'))
    qb.orderByRaw('maha_rights.code asc, maha_users_roles.role_id asc')
  }).fetchAll({
    withRelated: ['app'],
    transacting: trx
  })

  const userAppRights = rights.reduce((userAppRights, right) => ({
    ...userAppRights,
    [right.get('app_id')]: [
      ...userAppRights[right.get('app_id')] || [],
      {
        id: right.get('id'),
        title: right.get('data').title,
        description: right.get('data').description,
        assigned: right.get('assigned')
      }
    ]
  }), {})

  return apps.map(app => ({
    id: app.get('id'),
    ...app.get('data'),
    installed: app.get('installed'),
    rights: userAppRights[app.get('id')] || []
  }))

}

const accessRoute = new Route({
  method: 'get',
  path: '/access',
  processor
})

export default accessRoute
