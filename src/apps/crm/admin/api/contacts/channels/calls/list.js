import Call from '../../../../../../maha/models/call'
import Contact from '../../../../../models/contact'

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

  const calls = await Call.filterFetch({
    scope: (qb) => {
      qb.where('program_id', req.params.program_id)
      qb.where('phone_number_id', req.params.id)
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
