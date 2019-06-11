import AppSerializer from '../../../serializers/app_serializer'
import knex from '../../../../../core/services/knex'
import App from '../../../../maha/models/app'

const appsRoute = async (req, res) => {

  const apps = await App.query(qb => {
    qb.select(knex.raw('maha_apps.*, maha_installations.id is not null as installed'))
    qb.joinRaw('inner join maha_teams_apps on maha_teams_apps.app_id = maha_apps.id and maha_teams_apps.team_id = ?', req.params.id)
    qb.joinRaw('left join maha_installations on maha_installations.app_id = maha_apps.id and maha_installations.team_id = ?', req.params.id)
    qb.orderBy('maha_apps.code', 'asc')
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(apps, (app) => {
    return AppSerializer(req, req.trx, app)
  })

}

export default appsRoute
