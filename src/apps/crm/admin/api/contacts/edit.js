import Field from '@apps/maha/models/field'
import Contact from '@apps/crm/models/contact'
import _ from 'lodash'

const editRoute = async (req, res) => {

  const contact = await Contact.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['email_addresses','mailing_addresses','phone_numbers','topics','lists'],
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'crm_programs')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  res.status(200).respond(contact, (req, contact) => ({
    first_name: contact.get('first_name'),
    last_name: contact.get('last_name'),
    organization: contact.get('organization'),
    position: contact.get('position'),
    spouse: contact.get('spouse'),
    birthday: contact.get('birthday'),
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
    mailing_addresses: contact.related('mailing_addresses').map(mailing_address => ({
      id: mailing_address.get('id'),
      address: mailing_address.get('address'),
      is_primary: mailing_address.get('is_primary')
    })),
    photo_id: contact.get('photo_id'),
    topic_ids: contact.get('topic_ids'),
    list_ids: contact.get('list_ids'),
    values: fields.reduce((values, field) => {
      const value = contact.get('values')[field.get('code')]
      if(!value) return values
      const multiple = _.includes(['checkboxes','checkboxgroup'], field.get('type')) || field.get('config').multiple === true
      return {
        ...values,
        [field.get('code')]: multiple ? value : value[0]
      }
    }, {})
  }))

}

export default editRoute
