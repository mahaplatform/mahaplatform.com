import ContactSerializer from '../../../serializers/contact_serializer'
import Field from '../../../../maha/models/field'
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

  req.fields = await Field.scope({
    team: req.team
  }).query(qb => {
    qb.where('parent_type', 'crm_contacts')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())
  
  res.status(200).respond(contacts, ContactSerializer)

}

export default listRoute
