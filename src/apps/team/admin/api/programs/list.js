import ProgramSerializer from '../../../serializers/program_serializer'
import Program from '../../../../maha/models/program'

const listRoute = async (req, res) => {

  const programs = await Program.scope({
    team: req.team
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['logo'],
    transacting: req.trx
  })

  res.status(200).respond(programs, ProgramSerializer)

}

export default listRoute
