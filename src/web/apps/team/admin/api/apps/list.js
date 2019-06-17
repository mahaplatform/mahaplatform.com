import AppSerializer from '../../../serializers/app_serializer'
import knex from '../../../../../core/services/knex'
import App from '../../../../maha/models/app'

const listRoute = async (req, res) => {

  const apps = await App.query(qb => {
    qb.select(knex.raw('maha_apps.*, maha_installations.id is not null as installed'))
    qb.joinRaw('inner join maha_installations on maha_installations.app_id = maha_apps.id and maha_installations.team_id = ?', req.team.get('id'))
    qb.joinRaw('inner join maha_teams_apps on maha_teams_apps.app_id = maha_installations.app_id and maha_teams_apps.team_id=maha_installations.team_id')
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'code'
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(apps, AppSerializer)
}

export default listRoute
