import ContactSerializer from '../../../serializers/contact_serializer'
import Contact from '../../../models/contact'

const listRoute = async (req, res) => {

  const contacts = await Contact.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
    searchParams: ['first_name','last_name','email']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'last_name',
    sortParams: ['id','first_name','last_name','email']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(contacts, ContactSerializer)

}

export default listRoute
