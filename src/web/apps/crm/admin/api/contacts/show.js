import ContactSerializer from '../../../serializers/contact_serializer'
import Field from '../../../../maha/models/field'
import Contact from '../../../models/contact'

const showRoute = async (req, res) => {

  const contact = await Contact.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['lists','organizations','photo','tags'],
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  req.fields = await Field.scope({
    team: req.team
  }).query(qb => {
    qb.where('parent_type', 'crm_contacts')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  res.status(200).respond(contact, ContactSerializer)

}

export default showRoute
