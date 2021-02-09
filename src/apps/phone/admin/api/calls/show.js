import CallSerializer from '@apps/maha/serializers/call_serializer'
import Call from '@apps/maha/models/call'

const showRoute = async (req, res) => {

  const call = await Call.query(qb => {
    qb.select('maha_calls.*','maha_call_totals.*')
    qb.innerJoin('maha_call_totals','maha_call_totals.call_id','maha_calls.id')
    qb.joinRaw('inner join crm_programs on crm_programs.id=maha_calls.program_id')
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=maha_calls.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('maha_calls.team_id', req.team.get('id'))
    qb.where('maha_calls.id', req.params.id)
  }).fetch({
    withRelated: ['to_number','from_number','program.logo','phone_number.contact'],
    transacting: req.trx
  })

  if(!call) return res.status(404).respond({
    code: 404,
    message: 'Unable to load call'
  })

  res.status(200).respond(call, CallSerializer)

}

export default showRoute
