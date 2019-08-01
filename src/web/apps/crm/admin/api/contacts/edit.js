import Contact from '../../../models/contact'

const editRoute = async (req, res) => {

  const contact = await Contact.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['organizations','tags'],
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  res.status(200).respond(contact, {
    fields: [
      'id',
      'first_name',
      'last_name',
      'email',
      'phone',
      'photo_id',
      'tag_ids',
      'organization_ids',
      'values'
    ]
  })

}

export default editRoute
