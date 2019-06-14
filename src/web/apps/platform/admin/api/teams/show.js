import TeamSerializer from '../../../serializers/team_serializer'
import Team from '../../../../maha/models/team'

const showRoute = async (req, res) => {

  const team = await Team.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['apps'],
    transacting: req.trx
  })

  if(!team) return req.status(404).respond({
    code: 404,
    message: 'Unable to load team'
  })

  res.status(200).respond(team, (team) => {
    return TeamSerializer(req, req.trx, team)
  })

}

export default showRoute
