import { Resources } from '../../../../../core/backframe'
import App from '../../../../maha/models/app'
import AppSerializer from '../../../serializers/app_serializer'
import install from './install'
import uninstall from './uninstall'

const defaultQuery = (req, trx, qb, options) => {

  qb.select(options.knex.raw('maha_apps.*, maha_installations.id is not null as installed'))

  qb.joinRaw('left join maha_installations on maha_installations.app_id = maha_apps.id and maha_installations.team_id = ?', req.team.get('id'))

  qb.innerJoin('maha_teams_apps', 'maha_teams_apps.app_id', 'maha_apps.id')

  qb.where('maha_teams_apps.team_id', req.team.get('id'))

  qb.whereNot('maha_apps.id', 1)

}

const appResources = new Resources({
  memberActions: [
    install,
    uninstall
  ],
  defaultQuery,
  defaultSort: ['code'],
  model: App,
  only: ['list','show'],
  ownedByTeam: false,
  path: '/apps',
  rights: ['team:manage_apps'],
  serializer: AppSerializer,
  sortParams: ['code']
})

export default appResources
