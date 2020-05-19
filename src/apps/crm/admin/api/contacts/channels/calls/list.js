import PhoneNumber from '../../../../../models/phone_number'
import Call from '../../../../../../maha/models/call'
import Contact from '../../../../../models/contact'
import Program from '../../../../../models/program'

const listRoute = async (req, res) => {

  const contact = await Contact.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.contact_id)
  }).fetch({
    withRelated: ['photo'],
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const program = await Program.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.program_id)
  }).fetch({
    withRelated: ['logo','phone_number'],
    transacting: req.trx
  })

  const phone = await PhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('contact_id', contact.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  const contact_number = phone.get('number')

  const program_number = program.related('phone_number').get('number')

  if(!program_number) return   res.status(200).respond([])

  const calls = await Call.filterFetch({
    scope: (qb) => {
      qb.joinRaw('inner join maha_numbers to_numbers on to_numbers.id=maha_calls.to_id')
      qb.joinRaw('inner join maha_numbers from_numbers on from_numbers.id=maha_calls.from_id')
      qb.whereRaw('((to_numbers.number=? and from_numbers.number=?) or (to_numbers.number=? and from_numbers.number=?))', [contact_number, program_number, program_number, contact_number])
      qb.where('team_id', req.team.get('id'))
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['to','from'],
    transacting: req.trx
  })

  res.status(200).respond(calls, (req, call) => ({
    id: call.get('id'),
    direction: call.get('direction'),
    duration: call.get('duration'),
    from: {
      id: call.related('from').get('id'),
      number: call.related('from').get('formatted')
    },
    to: {
      id: call.related('to').get('id'),
      number: call.related('to').get('formatted')
    },
    created_at: call.get('created_at'),
    updated_at: call.get('updated_at')

  }))

}

export default listRoute
