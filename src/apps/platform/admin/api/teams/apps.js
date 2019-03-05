import AppSerializer from '../../../serializers/app_serializer'
import { App, Route } from 'maha'

const processor = async (req, trx, options) => {

  const apps = await App.query(qb => {

    qb.select(options.knex.raw('maha_apps.*, maha_installations.id is not null as installed'))

    qb.joinRaw('inner join maha_teams_apps on maha_teams_apps.app_id = maha_apps.id and maha_teams_apps.team_id = ?', req.params.id)

    qb.joinRaw('left join maha_installations on maha_installations.app_id = maha_apps.id and maha_installations.team_id = ?', req.params.id)

    qb.orderBy('maha_apps.code', 'asc')

  }).fetchAll({ transacting: trx }).then(records => records.toArray())

  return {
    records: apps,
    all: apps.length,
    total: apps.length
  }

}

const appsRoute = new Route({
  path: '/apps',
  processor,
  method: 'get',
  serializer: AppSerializer
})

export default appsRoute
