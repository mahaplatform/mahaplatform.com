import AppSerializer from '@apps/team/serializers/app_serializer'
import App from '@apps/maha/models/app'

const listRoute = async (req, res) => {

  const apps = await App.filterFetch({
    scope: qb => {
      qb.select(req.trx.raw('maha_apps.*, maha_installations.id is not null as installed'))
      qb.joinRaw('inner join maha_teams_apps on maha_teams_apps.app_id = maha_apps.id and maha_teams_apps.team_id=?', req.team.get('id'))
      qb.joinRaw('left join maha_installations on maha_installations.app_id = maha_apps.id and maha_installations.team_id = ?', req.team.get('id'))
    },
    sort: {
      params: req.query.$sort,
      defaults: 'code'
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(apps, AppSerializer)
}

export default listRoute
