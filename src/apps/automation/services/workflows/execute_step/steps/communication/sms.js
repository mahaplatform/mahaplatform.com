import PhoneNumber from '@apps/crm/models/phone_number'
import { sendSMS } from '@apps/maha/services/smses'
import { getNext } from '../utils'

const getNumber = (tokens) => {
  const { contact, order, registration, response} = tokens
  if(order && order.phone) return order.phone
  if(registration && registration.phone) return registration.phone
  if(response && response.phone) return response.phone
  if(contact && contact.phone) return contact.phone
  return null
}

const getPhoneNumber = async (req, { contact, tokens }) => {
  const number = getNumber(tokens)
  if(!number) return null
  return await PhoneNumber.query(qb => {
    qb.where('contact_id', contact.get('id'))
    qb.where('number', number)
  }).fetch({
    transacting: req.trx
  })
}

const smsStep = async (req, { config, contact, program, state, step, tokens }) => {

  const phone_number = await getPhoneNumber(req, {
    contact,
    tokens
  })

  if(!phone_number) return {}

  await program.load(['phone_number'], {
    transacting: req.trx
  })

  const sms = await sendSMS(req, {
    from: program.related('phone_number').get('number'),
    to: phone_number.get('number'),
    body: step.config.message,
    asset_ids: step.config.asset_ids,
    data: tokens
  })

  return {
    action: {
      sms_id: sms.get('id')
    },
    next: getNext(req, { config, state })
  }

}

export default smsStep
