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

  res.status(200).respond(contacts, (req, result) => ({
    id: result.get('id'),
    code: result.get('code'),
    display_name: result.get('display_name'),
    full_name: result.get('full_name'),
    initials: result.get('initials'),
    email: result.get('email'),
    phone: result.get('phone'),
    photo: result.related('photo') ? result.related('photo').get('path') : null    
  }))

}

export default listRoute
