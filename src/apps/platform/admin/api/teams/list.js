import TeamSerializer from '../../../serializers/team_serializer'
import Team from '../../../../maha/models/team'

const listRoute = async (req, res) => {

  const teams = await Team.filterFetch({
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

  res.status(200).respond(teams, TeamSerializer)
}

export default listRoute
