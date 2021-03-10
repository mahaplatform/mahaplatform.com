import ContactSerializer from '@apps/crm/serializers/contact_serializer'
import { getContacts } from '@apps/crm/services/contacts'
import Field from '@apps/maha/models/field'

const listRoute = async (req, res) => {

  const contacts = await getContacts(req, {
    empty: true,
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

export default listRoute
