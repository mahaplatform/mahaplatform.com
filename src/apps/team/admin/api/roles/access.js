import Right from '@apps/maha/models/right'
import Role from '@apps/maha/models/role'
import App from '@apps/maha/models/app'

const accessRoute = async (req, res) => {

  const role = await Role.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!role) return res.status(404).respond({
    code: 404,
    message: 'Unable to load role'
  })

  const apps = await App.query(qb => {
    qb.select(req.trx.raw('distinct on (maha_apps.id) maha_apps.*, maha_roles_apps.role_id is not null as installed'))
    qb.joinRaw('inner join maha_installations on maha_installations.app_id = maha_apps.id and maha_installations.team_id = ?', req.team.get('id'))
    qb.joinRaw('left join maha_roles_apps on maha_roles_apps.app_id = maha_apps.id and maha_roles_apps.role_id = ?', role.get('id'))
    qb.orderByRaw('maha_apps.id asc, maha_roles_apps.role_id asc')
  }).fetchAll({
    transacting: req.trx
  })

  const rights = await Right.query(qb => {
    qb.select(req.trx.raw('distinct on (maha_rights.id) maha_rights.*, maha_roles_rights.role_id is not null as assigned'))
    qb.joinRaw('left join maha_roles_rights on maha_roles_rights.right_id = maha_rights.id and maha_roles_rights.role_id = ?', role.get('id'))
    qb.orderByRaw('maha_rights.id asc, maha_roles_rights.role_id asc')
  }).fetchAll({
    withRelated: ['app'],
    transacting: req.trx
  })

  const appRights = rights.reduce((appRights, right) => ({
    ...appRights,
    [right.get('app_id')]: [
      ...appRights[right.get('app_id')] || [],
      {
        id: right.get('id'),
        title: right.get('data').title,
        description: right.get('data').description,
        assigned: right.get('assigned')
      }
    ]
  }), {})

  const access = apps.map(app => ({
    id: app.get('id'),
    ...app.get('data'),
    installed: app.get('installed'),
    rights: appRights[app.get('id')] || []
  })).sort((a,b) => {
    if(a.title > b.title) return 1
    if(a.title < b.title) return -1
    return 0
  })

  await res.status(200).respond(access)

}

export default accessRoute
