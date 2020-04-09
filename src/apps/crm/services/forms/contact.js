import generateCode from '../../../../core/utils/generate_code'
import { updateMailingAddresses } from '../mailing_addresses'
import { updateEmailAddresses } from '../email_addresses'
import { updatePhoneNumbers } from '../phone_numbers'
import EmailAddress from '../../models/email_address'
import Contact from '../../models/contact'
import _ from 'lodash'

const getContact = async (req, { email }) => {

  const email_address = await EmailAddress.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('address', email)
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  if(email_address) {
    email_address.related('contact').is_known = true
    return email_address.related('contact')
  }

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  const contact = await Contact.forge({
    team_id: req.team.get('id'),
    code
  }).save(null, {
    transacting: req.trx
  })

  contact.is_known = false

  return contact

}

const updateContact = async (req, { contact, fields, data }) => {

  const contactfields = fields.filter(field => {
    return field.type === 'contactfield'
  })

  const core = contactfields.filter(field => {
    return _.includes(['first_name','last_name','spouse','birthday'], field.contactfield.name)
  }).reduce((values, field) => {
    if(!_.isNil(values[field.contactfield.name]) && field.overwrite === false) return values
    return {
      ...values,
      [field.contactfield.name]: data[field.contactfield.name]
    }
  }, {})

  const values = contactfields.filter(field => {
    return field.contactfield.name.match(/^values./)
  }).reduce((values, field) => {
    const [,code] = field.contactfield.name.match(/^values.(.*)/)
    if(!_.isNil(values[code]) && field.overwrite === false) return values
    return {
      ...values,
      [code]: _.castArray(data[field.contactfield.name])
    }
  }, contact.get('values') || {})

  await contact.save({
    ...core,
    values
  }, {
    transacting: req.trx,
    patch: true
  })

}

export const createOrUpdateContact = async (req, { fields, contactdata }) => {

  const data = fields.filter(field => {
    return field.type === 'contactfield'
  }).reduce((data, field) => ({
    ...data,
    [field.contactfield.name]: contactdata[field.code]
  }), {})

  const contact = await getContact(req, {
    email: data.email
  })

  await updateContact(req, {
    contact,
    fields,
    data
  })

  if(data.email) {
    await updateEmailAddresses(req, {
      contact,
      email_addresses: [
        { address: data.email }
      ],
      removing: false
    })
  }

  if(data.phone) {
    await updatePhoneNumbers(req, {
      contact,
      phone_numbers: [
        { number: data.phone }
      ],
      removing: false
    })
  }

  if(data.address) {
    await updateMailingAddresses(req, {
      contact,
      mailing_addresses: [
        { address: data.address }
      ],
      removing: false
    })
  }

  return contact

}
