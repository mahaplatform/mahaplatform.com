import CallSerializer from '@apps/maha/serializers/call_serializer'
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
      qb.where('program_id', req.params.program_id)
      qb.where('phone_number_id', req.params.id)
      qb.whereNull('parent_id')
      qb.where('team_id', req.team.get('id'))
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['to_number','from_number','program.logo','phone_number.contact.photo'],
    transacting: req.trx
  })

  res.status(200).respond(calls, CallSerializer)

}

export default callsRoute
