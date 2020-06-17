import generateCode from '../../../../core/utils/generate_code'
import MailingAddress from '../../models/mailing_address'
import { getFormattedNumber } from '../phone_numbers'
import EmailAddress from '../../models/email_address'
import PhoneNumber from '../../models/phone_number'
import Contact from '../../models/contact'
import _ from 'lodash'

const getContactByEmails = async (req, params) => {

  const value = params.emails || params.email

  if(_.isNil(value)) return null

  const emails = _.castArray(value).filter(email => {
    return !_.isNil(email) && email.length > 0
  }).map(email => {
    return email.toLowerCase()
  })

  if(emails.length === 0) return null

  const email_address = await EmailAddress.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.whereIn('address', emails)
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  if(!email_address) return null

  email_address.related('contact').is_known = true

  return email_address.related('contact')

}

const getContactByPhones = async (req, params) => {

  const { first_name, last_name } = params

  const value = params.phones || params.phone

  if(_.isNil(first_name) || _.isNil(last_name) || _.isNil(value)) return null

  const phones = _.castArray(value).filter(phone => {
    return !_.isNil(phone) && phone.length > 0
  }).map(phone => {
    return getFormattedNumber(phone)
  })

  if(phones.length === 0) return null

  const phone_number = await PhoneNumber.query(qb => {
    qb.innerJoin('crm_contacts', 'crm_contacts.id', 'crm_phone_numbers.contact_id')
    qb.where('crm_phone_numbers.team_id', req.team.get('id'))
    qb.whereRaw('lower(crm_contacts.first_name) = ?', first_name.toLowerCase())
    qb.whereRaw('lower(crm_contacts.last_name) = ?', last_name.toLowerCase())
    qb.whereIn('crm_phone_numbers.number', phones)
    qb.where('crm_phone_numbers.team_id', req.team.get('id'))
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  if(!phone_number) return

  phone_number.related('contact').is_known = true

  return phone_number.related('contact')

}

const getContactByAddresses = async (req,  params) => {

  const { first_name, last_name } = params

  const value = params.addresses || params.address

  if(_.isNil(first_name) || _.isNil(last_name) || _.isNil(value)) return null

  const addresses = _.castArray(value).filter(address => {
    return !_.isNil(address)
  }).map(address => {
    return address.street_1.toLowerCase()
  })

  if(addresses.length === 0) return null

  const mailing_address = await MailingAddress.query(qb => {
    qb.innerJoin('crm_contacts', 'crm_contacts.id', 'crm_mailing_addresses.contact_id')
    qb.where('crm_mailing_addresses.team_id', req.team.get('id'))
    qb.whereRaw('lower(crm_contacts.first_name) = ?', first_name.toLowerCase())
    qb.whereRaw('lower(crm_contacts.last_name) = ?', last_name.toLowerCase())
    qb.whereRaw(`lower(crm_mailing_addresses.address->>'street_1') in (${Array(addresses.length).fill('?').join(',')})`, addresses)
    qb.where('crm_mailing_addresses.team_id', req.team.get('id'))
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  if(!mailing_address) return

  mailing_address.related('contact').is_known = true

  return mailing_address.related('contact')

}

const getContact = async (req, params) => {

  const emailContact = await getContactByEmails(req, params)
  if(emailContact) return emailContact

  const phoneContact = await getContactByPhones(req, params)
  if(phoneContact) return phoneContact

  const addressContact = await getContactByAddresses(req, params)
  if(addressContact) return addressContact

  if(params.createContact === false) return null

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  const contact = await Contact.forge({
    team_id: req.team.get('id'),
    code,
    values: {}
  }).save(null, {
    transacting: req.trx
  })

  contact.is_known = false

  return contact

}

export default getContact
