import ContactSerializer from '../../../../serializers/contact_serializer'
import { getContacts } from '../../../../services/contacts'
import Field from '../../../../../maha/models/field'

const contactsRoute = async (req, res) => {

  const contacts = await getContacts(req, {
    scope: (qb) => {
      qb.joinRaw('inner join crm_interests on crm_interests.contact_id=crm_contacts.id and crm_interests.topic_id=?', req.params.topic_id)
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

  res.status(200).respond(contacts, ContactSerializer)

}

export default contactsRoute
