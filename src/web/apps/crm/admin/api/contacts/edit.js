import Contact from '../../../models/contact'

const editRoute = async (req, res) => {

  const contact = await Contact.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['addresses','email_addresses','organizations','phone_numbers','tags'],
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  res.status(200).respond(contact, (req, contact) => ({
    first_name: contact.get('first_name'),
    last_name: contact.get('last_name'),
    email_addresses: contact.related('email_addresses').map(email_address => ({
      id: email_address.get('id'),
      address: email_address.get('address'),
      is_primary: email_address.get('is_primary')
    })),
    phone_numbers: contact.related('phone_numbers').map(phone_number => ({
      id: phone_number.get('id'),
      number: phone_number.get('number'),
      is_primary: phone_number.get('is_primary')
    })),
    addresses: contact.related('addresses').map(address => ({
      id: address.get('id'),
      address: address.get('address'),
      is_primary: address.get('is_primary')
    })),
    photo_id: contact.get('photo_id'),
    tag_ids: contact.get('tag_ids'),
    organization_ids: contact.get('organization_ids'),
    values: contact.get('values')
  }))

}

export default editRoute
