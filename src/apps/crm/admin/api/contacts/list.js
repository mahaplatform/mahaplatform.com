import ContactSerializer from '../../../serializers/contact_serializer'
import { getContacts } from '../../../services/contacts'
import Field from '../../../../maha/models/field'

const listRoute = async (req, res) => {

  const fields = await Field.query(qb => {
    qb.where('parent_type', 'crm_programs')
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    transacting: req.trx
  })

  const contacts = await getContacts(req, {
    fields,
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

export default listRoute
