import Contact from '../../../models/contact'
import * as consents from '../../consents'
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
      return email_address.get('address') === value
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

export const updateConsent = async (req, params) => {

  const { action, channel_type, enrollment, token } = params

  await enrollment.load(['contact','response','workflow.program'], {
    transacting: req.trx
  })

  const contact = enrollment.related('contact')

  const program = enrollment.related('workflow').related('program')

  const response = enrollment.related('response')

  const data = {
    contact: await getContactData(req, { enrollment }),
    response: response.get('data')
  }

  const value = _.get(data, token)

  const channel = await getChannel(req, {
    contact,
    channel_type,
    value
  })

  if(!channel) return {}

  await consents.updateConsent(req, {
    program,
    channel_type,
    channel_id: channel.get('id'),
    optout: false,
    optin_reason: 'consent',
    optout_reason: null,
    optout_reason_other: null
  })

  return {}

}
