import { updatePhoneNumbers, getFormattedNumber } from '../phone_numbers'
import generateCode from '../../../../core/utils/generate_code'
import { updateMailingAddresses } from '../mailing_addresses'
import { updateEmailAddresses } from '../email_addresses'
import EmailAddress from '../../models/email_address'
import PhoneNumber from '../../models/phone_number'
import Contact from '../../models/contact'
import _ from 'lodash'

const getContactByEmail = async (req, params) => {

  const email = params.email ? params.email.toLowerCase() : null

  const email_address = !_.isNil(email) ? await EmailAddress.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('address', email)
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  }) : null

  if(!email_address) return null

  email_address.related('contact').is_known = true

  return email_address.related('contact')

}

const getContactByPhone = async (req, params) => {

  const first_name = params.first_name ? params.first_name.toLowerCase() : null

  const last_name = params.last_name ? params.last_name.toLowerCase() : null

  const { phone } = params

  const phone_number = !_.isNil(first_name) && !_.isNil(last_name) && !_.isNil(phone) ? await PhoneNumber.query(qb => {
    qb.innerJoin('crm_contacts', 'crm_contacts.id', 'crm_phone_numbers.contact_id')
    qb.where('crm_phone_numbers.team_id', req.team.get('id'))
    qb.whereRaw('lower(crm_contacts.first_name)=?', first_name)
    qb.whereRaw('lower(crm_contacts.last_name)=?', last_name)
    qb.where('crm_phone_numbers.number', getFormattedNumber(phone))
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  }) : null

  if(!phone_number) return

  phone_number.related('contact').is_known = true

  return phone_number.related('contact')

}

const getContact = async (req, params) => {

  const emailContact = await getContactByEmail(req, params)

  if(emailContact) return emailContact

  const phoneContact = await getContactByPhone(req, params)

  if(phoneContact) return phoneContact

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

const getField = (contactfields, name) => {
  return contactfields.find(field => {
    return field.contactfield.name === name
  })
}

export const createOrUpdateContact = async (req, { fields, data }) => {

  const contactfields = fields.filter(field => {
    return field.type === 'contactfield'
  })

  const firstnamefield = getField(contactfields, 'first_name')
  const lastnamefield = getField(contactfields, 'last_name')
  const emailfield = getField(contactfields, 'email')
  const phonefield = getField(contactfields, 'phone')

  const contact = await getContact(req, {
    first_name: firstnamefield ? data[firstnamefield.code] : null,
    last_name: lastnamefield ? data[lastnamefield.code] : null,
    email: emailfield ? data[emailfield.code] : null,
    phone: phonefield ? data[phonefield.code] : null
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
