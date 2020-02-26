import ContactSerializer from '../../../serializers/contact_serializer'
import { getContacts } from '../../../services/contacts'
import Field from '../../../../maha/models/field'

const listRoute = async (req, res) => {

  const contacts = await getContacts(req, {
    filter: req.params.$filter,
    sort: req.params.$sort,
    page: req.params.$page
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
