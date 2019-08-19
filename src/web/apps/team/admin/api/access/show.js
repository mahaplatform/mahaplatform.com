import Right from '../../../../maha/models/right'
import App from '../../../../maha/models/app'

const showRoute = async (req, res) => {

  const apps = await App.query(qb => {
    qb.select(req.trx.raw('distinct on (maha_apps.id) maha_apps.*'))
    qb.joinRaw('inner join maha_installations on maha_installations.app_id = maha_apps.id and maha_installations.team_id = ?', req.team.get('id'))
    qb.orderBy('maha_apps.id')
  }).fetchAll({
    transacting: req.trx
  })

  const rights = await Right.query(qb => {
    qb.select(req.trx.raw('distinct on (maha_rights.id) maha_rights.*, maha_users_roles.role_id is not null as assigned'))
    qb.leftJoin('maha_roles_rights', 'maha_roles_rights.right_id', 'maha_rights.id')
    qb.joinRaw('left join maha_users_roles on maha_users_roles.role_id = maha_roles_rights.role_id')
    qb.orderBy('maha_rights.id')
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
        description: right.get('data').description
      }
    ]
  }), {})

  const access = apps.map(app => ({
    id: app.get('id'),
    ...app.get('data'),
    rights: appRights[app.get('id')] || []
  })).sort((a,b) => {
    return (a.title > b.title) ? 1 : -1
  })

  res.status(200).respond(access)

}

export default showRoute
