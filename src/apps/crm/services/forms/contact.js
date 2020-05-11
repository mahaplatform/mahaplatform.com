import { updatePhoneNumbers } from '../phone_numbers'
import { updateMailingAddresses } from '../mailing_addresses'
import { updateEmailAddresses } from '../email_addresses'
import { getContact } from '../contacts'
import _ from 'lodash'

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

const getLookupValue = (contactfields, data, name) => {
  const field = contactfields.find(field => {
    return field.contactfield.name === name
  })
  return field ? data[field.code] : null
}

export const createOrUpdateContact = async (req, { fields, data }) => {

  const contactfields = fields.filter(field => {
    return field.type === 'contactfield'
  })

  const contact = await getContact(req, {
    first_name: getLookupValue(contactfields, data, 'first_name'),
    last_name: getLookupValue(contactfields, data, 'last_name'),
    emails: getLookupValue(contactfields, data, 'email'),
    phones: getLookupValue(contactfields, data, 'phone'),
    addresses: getLookupValue(contactfields, data, 'address')
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
    return !_.isNil(data[field.code])
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
