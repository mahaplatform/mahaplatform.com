import AppSerializer from '@apps/platform/serializers/app_serializer'
import App from '@apps/maha/models/app'

const appsRoute = async (req, res) => {

  const apps = await App.query(qb => {
    qb.select(req.trx.raw('maha_apps.*, maha_installations.id is not null as installed'))
    qb.joinRaw('inner join maha_teams_apps on maha_teams_apps.app_id = maha_apps.id and maha_teams_apps.team_id = ?', req.params.id)
    qb.joinRaw('left join maha_installations on maha_installations.app_id = maha_apps.id and maha_installations.team_id = ?', req.params.id)
    qb.orderBy('maha_apps.code', 'asc')
  }).fetchAll({
    transacting: req.trx
  })

  await res.status(200).respond(apps, AppSerializer)

}

export default appsRoute
