import TeamSerializer from '@apps/team/serializers/team_serializer'

const showRoute = async (req, res) => {

  await req.team.load('logo', {
    transacting: req.trx
  })

  res.status(200).respond(req.team, TeamSerializer)

}

export default showRoute
