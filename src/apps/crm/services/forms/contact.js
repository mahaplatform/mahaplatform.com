import { getFormattedNumber, updatePhoneNumbers } from '../phone_numbers'
import { updateMailingAddresses } from '../mailing_addresses'
import { updateEmailAddresses } from '../email_addresses'
import EmailAddress from '../../models/email_address'
import PhoneNumber from '../../models/phone_number'
import { updateConsent } from '../consents'
import { getContact } from '../contacts'
import _ from 'lodash'

const getContactfields = ({ contactfields, data, name, key, string }) => {
  return contactfields.filter(field => {
    return field.contactfield.name === name
  }).filter(field => {
    return !_.isNil(data[field.code]) && (string === false || data[field.code].length > 0)
  }).reduce((fields, field) => [
    ...fields,
    { [key]: data[field.code] }
  ], [])
}

const updateEmailConsent = async (req, { contact, consent, email_addresses, program }) => {
  await Promise.map(email_addresses, async (address) => {
    const email_address = await EmailAddress.query(qb => {
      qb.where('contact_id', contact.get('id'))
      qb.where('address', address.address)
    }).fetch({
      transacting: req.trx
    })
    if(_.includes(consent, 'email')) {
      await updateConsent(req, {
        channel_type: 'email',
        channel_id: email_address.get('id'),
        program,
        optin_reason: 'consent',
        optout: false
      })
    }
  })
}

const updatePhoneConsent = async (req, { contact, consent, phone_numbers, program }) => {
  await Promise.map(phone_numbers, async (number) => {
    const phone_number = await PhoneNumber.query(qb => {
      qb.where('contact_id', contact.get('id'))
      qb.where('number', getFormattedNumber(number.number))
    }).fetch({
      transacting: req.trx
    })
    if(_.includes(consent, 'voice')) {
      await updateConsent(req, {
        channel_type: 'voice',
        channel_id: phone_number.get('id'),
        program,
        optin_reason: 'consent',
        optout: false
      })
    }
    if(_.includes(consent, 'sms')) {
      await updateConsent(req, {
        channel_type: 'sms',
        channel_id: phone_number.get('id'),
        program,
        optin_reason: 'consent',
        optout: false
      })
    }
  })
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

const getLookupValue = (field, data) => {
  const value = field ? data[field.code] : null
  return value !== null && value.length > 0 ? value : null
}

export const createOrUpdateContact = async (req, { fields, program, data }) => {

  const contactfields = fields.filter(field => {
    return field.type === 'contactfield'
  })

  const contact = await getContact(req, contactfields.reduce((fields, field) => ({
    ...fields,
    [field.contactfield.name]: getLookupValue(field, data)
  }), {}))

  await updateContact(req, {
    contact,
    contactfields,
    data
  })

  const consent = contactfields.filter(field => {
    return field.contactfield.name.match(/^consent./)
  }).reduce((channels, field) => {
    const [,channel] = field.contactfield.name.match(/^consent.(.*)/)
    if(data[field.code] !== true) return channels
    return [
      ...channels,
      channel
    ]
  }, [])

  const email_addresses = getContactfields({
    contactfields,
    data,
    name: 'email',
    key: 'address'
  })

  if(email_addresses.length > 0) {
    await updateEmailAddresses(req, {
      contact,
      email_addresses,
      removing: false
    })
    await updateEmailConsent(req, {
      contact,
      consent,
      email_addresses,
      program
    })
  }

  const phone_numbers = getContactfields({
    contactfields,
    data,
    name: 'phone',
    key: 'number'
  })

  console.log(phone_numbers)

  if(phone_numbers.length > 0) {
    await updatePhoneNumbers(req, {
      contact,
      phone_numbers,
      removing: false
    })
    await updatePhoneConsent(req, {
      contact,
      consent,
      phone_numbers,
      program
    })
  }

  const mailing_addresses = getContactfields({
    contactfields,
    data,
    name: 'address',
    key: 'address',
    string: false
  })

  if(mailing_addresses.length > 0) {
    await updateMailingAddresses(req, {
      contact,
      mailing_addresses,
      removing: false
    })
  }

  return contact

}
