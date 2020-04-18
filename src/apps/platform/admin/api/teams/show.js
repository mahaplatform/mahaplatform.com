import TeamSerializer from '../../../serializers/team_serializer'
import Team from '../../../../maha/models/team'

const showRoute = async (req, res) => {

  const team = await Team.query(qb => {
    qb.select('maha_teams.*','maha_team_totals.*')
    qb.innerJoin('maha_team_totals', 'maha_team_totals.team_id', 'maha_teams.id')
    qb.where('maha_teams.id', req.params.id)
  }).fetch({
    withRelated: ['apps','logo'],
    transacting: req.trx
  })

  if(!team) return res.status(404).respond({
    code: 404,
    message: 'Unable to load team'
  })

  res.status(200).respond(team, TeamSerializer)

}

export default showRoute
