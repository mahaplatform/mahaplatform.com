import Installation from '../../../apps/maha/models/installation'
import Right from '../../../apps/maha/models/right'
import App from '../../../apps/maha/models/app'
import knex from '../services/knex'

export default async (req, user) => {

  const apps = await App.fetchAll({
    transacting: req.trx
  })

  const installations = await Installation.query(qb => {
    qb.select(knex.raw('distinct on (maha_installations.app_id) maha_installations.*'))
    qb.innerJoin('maha_roles_apps', 'maha_roles_apps.app_id', 'maha_installations.app_id')
    qb.innerJoin('maha_users_roles', 'maha_users_roles.role_id', 'maha_roles_apps.role_id')
    qb.where('maha_installations.team_id', user.get('team_id'))
    qb.where('maha_users_roles.user_id', user.get('id'))
  }).fetchAll({
    transacting: req.trx
  })

  const rights = await Right.query(qb => {
    qb.select(knex.raw('distinct on (maha_rights.id) maha_rights.*'))
    qb.innerJoin('maha_roles_rights', 'maha_roles_rights.right_id', 'maha_rights.id')
    qb.innerJoin('maha_users_roles', 'maha_users_roles.role_id', 'maha_roles_rights.role_id')
    qb.where('maha_users_roles.user_id', user.get('id'))
  }).fetchAll({
    withRelated: ['app'],
    transacting: req.trx
  })

  const appMap = apps.reduce((apps, app) => ({
    ...apps,
    [app.get('id')]: app.get('data')
  }), {})

  const assignedApps = installations.reduce((apps, installation) => {

    const config = appMap[installation.get('app_id')]

    return {
      ...apps,
      [config.code]: {
        id: installation.get('app_id'),
        code: config.code,
        label: config.title,
        icon: config.icon,
        color: config.color,
        route: '/admin'+config.path,
        path: '/admin'+config.path,
        settings: installation.get('settings')
      }
    }

  }, {
    maha: {
      code: 'maha',
      label: 'Maha',
      icon: 'bars',
      color: 'blue'
    }
  })

  const assignedRights = rights.map(right => {
    const appCode = right.related('app') ? right.related('app').get('code') : 'maha'
    return appCode + ':' + right.get('code')
  })

  return {
    apps: assignedApps,
    rights: assignedRights
  }

}
