import AppSerializer from '../../../serializers/app_serializer'
import knex from '../../../../../core/services/knex'
import App from '../../../../maha/models/app'

const listRoute = async (req, res) => {

  const apps = await App.scope({
    team: req.team
  }).query(qb => {
    qb.select(knex.raw('maha_apps.*, maha_installations.id is not null as installed'))
    qb.joinRaw('left join maha_installations on maha_installations.app_id = maha_apps.id and maha_installations.team_id = ?', req.team.get('id'))
    qb.innerJoin('maha_teams_apps', 'maha_teams_apps.app_id', 'maha_apps.id')
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'code'
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(apps, (app) => {
    return AppSerializer(req, app)
  })
}

export default listRoute
