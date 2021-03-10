import ContactSerializer from '@apps/crm/serializers/contact_serializer'
import { getContacts } from '@apps/crm/services/contacts'
import Field from '@apps/maha/models/field'

const contactsRoute = async (req, res) => {

  const contacts = await getContacts(req, {
    scope: (qb) => {
      qb.joinRaw('inner join crm_subscriptions on crm_subscriptions.contact_id=crm_contacts.id and crm_subscriptions.list_id=?', req.params.list_id)
    },
    filter: req.query.$filter,
    sort: req.query.$sort,
    page: req.query.$page
  })

  req.fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'crm_programs')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  await res.status(200).respond(contacts, ContactSerializer)

}

export default contactsRoute
