import Call from '@apps/maha/models/call'
import Program from '@apps/crm/models/program'

const listRoute = async (req, res) => {

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
      qb.select(req.trx.raw('distinct on (program_id, phone_number_id) maha_calls.*'))
      qb.where('program_id', program.get('id'))
      qb.orderByRaw('program_id, phone_number_id, created_at desc')
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['phone_number.contact'],
    transacting: req.trx
  })

  await res.status(200).respond(calls, (req, call) => {
    const phone_number = call.related('phone_number')
    const contact = phone_number.related('contact')
    return {
      id: call.get('id'),
      phone_number: {
        id: phone_number.get('id'),
        number: phone_number.get('number')
      },
      contact: {
        id: contact.get('id'),
        display_name: contact.get('display_name'),
        initials: contact.get('initials'),
        rfc822: contact.get('rfc822'),
        email: contact.get('email'),
        photo: contact.related('photo') ? contact.related('photo').get('path') : null
      }
    }
  })

}

export default listRoute
