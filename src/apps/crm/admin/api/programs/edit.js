import Program from '../../../models/program'

const editRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load program'
  })

  res.status(200).respond(program, {
    fields: [
      'id',
      'title',
      'logo_id',
      'address',
      'phone_number_id',
      'merchant_id'
    ]
  })

}

export default editRoute
