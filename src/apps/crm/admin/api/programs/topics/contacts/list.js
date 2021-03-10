import ContactSerializer from '@apps/crm/serializers/contact_serializer'
import { getContacts } from '@apps/crm/services/contacts'

const listRoute = async (req, res) => {

  const contacts = await getContacts(req, {
    scope: (qb) => {
      qb.joinRaw('inner join crm_interests on crm_interests.contact_id=crm_contacts.id and crm_interests.topic_id=?', req.params.topic_id)
    },
    filter: req.query.$filter,
    sort: req.query.$sort,
    page: req.query.$page
  })

  await res.status(200).respond(contacts, ContactSerializer)

}

export default listRoute
