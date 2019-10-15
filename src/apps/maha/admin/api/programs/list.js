import ProgramSerializer from '../../../serializers/program_serializer'
import Program from '../../../models/program'

const listRoute = async (req, res) => {

  const programs = await Program.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['logo'],
    transacting: req.trx
  })

  res.status(200).respond(programs, ProgramSerializer)

}

export default listRoute
