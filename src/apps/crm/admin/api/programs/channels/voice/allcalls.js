import CallSerializer from '@apps/crm/serializers/call_serializer'
import Call from '@apps/maha/models/call'
import Program from '@apps/crm/models/program'

const callsRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.select(req.trx.raw('crm_programs.*,crm_program_user_access.type as access_type'))
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', req.params.program_id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load program'
  })

  const calls = await Call.filterFetch({
    scope: (qb) => {
      qb.leftJoin('crm_phone_numbers', 'crm_phone_numbers.id', 'maha_calls.phone_number_id')
      qb.leftJoin('crm_contacts', 'crm_contacts.id', 'crm_phone_numbers.contact_id')
      qb.where('maha_calls.program_id', req.params.program_id)
      qb.where('maha_calls.team_id', req.team.get('id'))
    },
    aliases: {
      first_name: 'crm_contacts.first_name',
      last_name: 'crm_contacts.last_name'
    },
    filter: {
      params: req.query.$filter,
      search: ['first_name','last_name']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['to','from','program.logo','user.photo','phone_number.contact.photo','enrollment.voice_campaign','from_user.photo','to_user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(calls, CallSerializer)

}

export default callsRoute
