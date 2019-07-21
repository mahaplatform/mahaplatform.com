import ContactSerializer from '../../../serializers/contact_serializer'
import Contact from '../../../models/contact'

const showRoute = async (req, res) => {

  const contact = await Contact.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['photo'],
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  res.status(200).respond(contact, ContactSerializer)

}

export default showRoute
