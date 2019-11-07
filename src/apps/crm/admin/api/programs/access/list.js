import ProgramAccessSerializer from '../../../../serializers/program_access_serializer'
import { checkProgramAccess } from '../../../../services/programs'
import ProgramAccess from '../../../../models/program_access'

const listRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit','view']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const accesses = await ProgramAccess.scope(qb => {
    qb.joinRaw('inner join crm_program_user_access a2 on a2.program_id=crm_program_accesses.program_id and a2.user_id=?', req.user.get('id'))
    qb.where('crm_program_accesses.team_id', req.team.get('id'))
    qb.where('crm_program_accesses.program_id', req.params.program_id)
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user.photo','group','grouping'],
    transacting: req.trx
  })

  res.status(200).respond(accesses, ProgramAccessSerializer)

}

export default listRoute
