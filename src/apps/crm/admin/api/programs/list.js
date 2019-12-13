import ProgramSerializer from '../../../serializers/program_serializer'
import Program from '../../../models/program'

const listRoute = async (req, res) => {

  const programs = await Program.scope(qb => {
    qb.select(req.trx.raw('crm_programs.*,crm_program_user_access.type as access_type'))
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_programs.team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    aliases: {
      access_type: 'crm_program_user_access.type'
    },
    filterParams: ['access_type','merchant_id']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['logo'],
    transacting: req.trx
  })

  res.status(200).respond(programs, ProgramSerializer)

}

export default listRoute
