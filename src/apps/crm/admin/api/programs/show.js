import ProgramSerializer from '../../../serializers/program_serializer'
import Program from '../../../models/program'

const showRoute = async (req, res) => {

  const program = await Program.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load program'
  })

  res.status(200).respond(program, ProgramSerializer)

}

export default showRoute
