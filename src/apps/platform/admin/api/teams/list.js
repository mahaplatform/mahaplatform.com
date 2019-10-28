import TeamSerializer from '../../../serializers/team_serializer'
import Team from '../../../../maha/models/team'

const listRoute = async (req, res) => {

  const teams = await Team.scope().filter({
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'title',
    sortParams: ['title', 'subdomain', 'logo']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['logo'],
    transacting: req.trx
  })

  res.status(200).respond(teams, TeamSerializer)
}

export default listRoute
