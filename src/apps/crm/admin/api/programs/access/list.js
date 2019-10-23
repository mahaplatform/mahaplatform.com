import ProgramAccessSerializer from '../../../../serializers/program_access_serializer'
import ProgramAccess from '../../../../models/program_access'

const listRoute = async (req, res) => {

  const accesses = await ProgramAccess.scope(qb => {
    qb.where('program_id', req.params.program_id)
    qb.where('team_id', req.team.get('id'))
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user.photo','group','grouping'],
    transacting: req.trx
  })

  res.status(200).respond(accesses, ProgramAccessSerializer)

}

export default listRoute
