import ContactSerializer from '@apps/crm/serializers/contact_serializer'
import Contact from '@apps/crm/models/contact'

const listRoute = async (req, res) => {

  const contacts = await Contact.query(qb => {
    qb.joinRaw('inner join crm_duplicates on crm_duplicates.duplicate_id=crm_contacts.id and crm_duplicates.contact_id=?', req.params.id)
  }).fetchAll({
    transacting: req.trx
  })

  await res.status(200).respond(contacts, ContactSerializer)

}

export default listRoute
