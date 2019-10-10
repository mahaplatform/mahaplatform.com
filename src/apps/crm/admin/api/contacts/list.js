import ContactSerializer from '../../../serializers/contact_serializer'
import Field from '../../../../maha/models/field'
import Contact from '../../../models/contact'

const listRoute = async (req, res) => {

  const contacts = await Contact.scope({
    team: req.team
  }).query(qb => {
    qb.select(req.trx.raw('distinct on (crm_contacts.id,crm_contacts.first_name,crm_contacts.last_name,crm_contacts.email) crm_contacts.*'))
    qb.leftJoin('crm_email_addresses', 'crm_email_addresses.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_phone_numbers', 'crm_phone_numbers.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_mailing_addresses', 'crm_mailing_addresses.contact_id', 'crm_contacts.id')
    qb.leftJoin('crm_taggings', 'crm_taggings.contact_id', 'crm_contacts.id')
  }).filter({
    filter: req.query.$filter,
    filterParams: ['first_name','last_name','email','phone','crm_taggings.tag_id'],
    searchParams: ['first_name','last_name','email']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'last_name',
    sortParams: ['id','first_name','last_name','email']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['photo','tags'],
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
