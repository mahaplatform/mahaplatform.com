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

const updateContact = async (req, { contact, contactfields, data }) => {

  const core = contactfields.filter(field => {
    return _.includes(['first_name','last_name','spouse','birthday'], field.contactfield.name)
  }).reduce((values, field) => {
    if(!_.isNil(contact.get(field.contactfield.name)) && field.overwrite === false) return values
    return {
      ...values,
      [field.contactfield.name]: data[field.code]
    }
  }, {})

  const values = contactfields.filter(field => {
    return field.contactfield.name.match(/^values./)
  }).reduce((values, field) => {
    const [,code] = field.contactfield.name.match(/^values.(.*)/)
    if(!_.isNil(values[code]) && field.overwrite === false) return values
    return {
      ...values,
      [code]: _.castArray(data[field.code])
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

export const createOrUpdateContact = async (req, { fields, data }) => {

  const contactfields = fields.filter(field => {
    return field.type === 'contactfield'
  })

  const emailfield = contactfields.find(field => {
    return field.contactfield.name === 'email'
  })

  const contact = await getContact(req, {
    email: data[emailfield.code].toLowerCase()
  })

  await updateContact(req, {
    contact,
    contactfields,
    data
  })

  const email_addresses = contactfields.filter(field => {
    return field.contactfield.name === 'email'
  }).filter(field => {
    return !_.isNil(data[field.code]) && data[field.code].length > 0
  }).reduce((email_addresses, field) => [
    ...email_addresses,
    { address: data[field.code].toLowerCase() }
  ], [])

  if(email_addresses.length > 0) {
    await updateEmailAddresses(req, {
      contact,
      email_addresses,
      removing: false
    })
  }

  const phone_numbers = contactfields.filter(field => {
    return field.contactfield.name === 'phone'
  }).filter(field => {
    return !_.isNil(data[field.code]) && data[field.code].length > 0
  }).reduce((phone_numbers, field) => [
    ...phone_numbers,
    { number: data[field.code] }
  ], [])

  if(phone_numbers.length > 0) {
    await updatePhoneNumbers(req, {
      contact,
      phone_numbers,
      removing: false
    })
  }

  const mailing_addresses = contactfields.filter(field => {
    return field.contactfield.name === 'address'
  }).filter(field => {
    return !_.isNil(data[field.code]) && data[field.code].length > 0
  }).reduce((mailing_addresses, field) => [
    ...mailing_addresses,
    { address: data[field.code] }
  ], [])

  if(mailing_addresses.length > 0) {
    await updateMailingAddresses(req, {
      contact,
      mailing_addresses,
      removing: false
    })
  }

  return contact

}
