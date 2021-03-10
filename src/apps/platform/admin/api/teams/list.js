import TeamSerializer from '@apps/platform/serializers/team_serializer'
import Team from '@apps/maha/models/team'

const listRoute = async (req, res) => {

  const teams = await Team.filterFetch({
    scope: (qb) => {
      qb.select('maha_teams.*','maha_team_totals.*')
      qb.innerJoin('maha_team_totals', 'maha_team_totals.team_id', 'maha_teams.id')
      qb.whereNull('deleted_at')
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title',
      allowed: ['title', 'subdomain', 'logo']
    },
    page: req.query.$page,
    withRelated: ['logo'],
    transacting: req.trx
  })

  await res.status(200).respond(teams, TeamSerializer)
}

export default listRoute
