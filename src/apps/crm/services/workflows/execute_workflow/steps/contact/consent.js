import Contact from '../../../../../models/contact'
import * as consents from '../../../../consents'
import _ from 'lodash'

const getContactData = async (req, { enrollment }) => {

  const contact = await Contact.query(qb => {
    qb.select(req.trx.raw('crm_contacts.*,crm_contact_primaries.*'))
    qb.leftJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    qb.where('crm_contacts.id', enrollment.get('contact_id'))
  }).fetch({
    transacting: req.trx
  })

  return {
    first_name: contact.get('first_name'),
    last_name: contact.get('last_name'),
    email: contact.get('email')
  }

}

const getChannel = async(req, { contact, channel_type, value }) => {

  if(channel_type === 'email') {
    await contact.load(['email_addresses'], {
      transacting: req.trx
    })
    return contact.related('email_addresses').toArray().find(email_address => {
      return email_address.get('address') === value.toLowerCase()
    })
  }

  if(_.includes(['sms','voice'], channel_type)) {
    await contact.load(['phone_numbers'], {
      transacting: req.trx
    })
    return contact.related('phone_numbers').toArray().find(phone_number => {
      return phone_number.get('number') === value
    })
  }

  if(channel_type === 'mail') {
    await contact.load(['mailing_addresses'], {
      transacting: req.trx
    })
    return contact.related('mailing_addresses').toArray().find(mailing_address => {
      return mailing_address.get('address') === value
    })
  }

}

const consentStep = async (req, { contact, config, enrollment }) => {

  const { action, channel_type, token } = config

  await enrollment.load(['response','workflow.program'], {
    transacting: req.trx
  })

  const program = enrollment.related('workflow').related('program')

  const response = enrollment.related('response')

  const data = {
    contact: await getContactData(req, { enrollment }),
    response: response.get('data')
  }

  const channel = await getChannel(req, {
    contact,
    channel_type,
    value: _.get(data, token)
  })

  if(!channel) return {}

  await consents.updateConsent(req, {
    program,
    channel_type,
    channel_id: channel.get('id'),
    ...action === 'remove' ? {
      optout: true,
      optout_reason: 'automated',
      optout_reason_other: null
    } : {
      optout: false,
      optin_reason: 'consent'
    }
  })

  return {}

}

export default consentStep
