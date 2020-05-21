import CallSerializer from '../../../../serializers/call_serializer'
import Call from '../../../../../maha/models/call'
import Contact from '../../../../models/contact'

const showRoute = async (req, res) => {

  const contact = await Contact.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.contact_id)
  }).fetch({
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const call = await Call.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['to','from','program.logo','user.photo','phone_number.contact.photo'],
    transacting: req.trx
  })

  res.status(200).respond(call, CallSerializer)

}

export default showRoute
