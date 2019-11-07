import Program from '../models/program'

export const checkProgramAccess = async (req, { program_id, types }) => {

  const program = await Program.query(qb => {
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.whereIn('crm_program_user_access.type', types)
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', program_id)
  }).fetch({
    transacting: req.trx
  })

  return program !== null

}
