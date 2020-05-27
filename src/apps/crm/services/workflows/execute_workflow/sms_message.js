import { sendSMS } from '../../../../maha/services/smses'
import { getFormattedNumber } from '../../phone_numbers'

const getPhoneNumber = async (req, { contact }) => {

  const phone = contact.get('phone') || null

  if(!phone) return null

  await contact.load(['phone_numbers'], {
    transacting: req.trx
  })

  const phone_numbers = contact.related('phone_numbers').toArray()

  const phone_number = phone_numbers.find(phone_number => {
    return phone_number.get('number') === getFormattedNumber(phone)
  })

  return phone_number

}

const smsMessage = async (req, { config, contact, enrollment, tokens }) => {

  await enrollment.load(['sms_campaign.program.phone_number'], {
    transacting: req.trx
  })

  const program = enrollment.related('sms_campaign').related('program')

  const phone_number = await getPhoneNumber(req, {
    contact
  })

  const sms = await sendSMS(req, {
    from: program.related('phone_number').get('number'),
    to: contact.get('phone'),
    body: config.message,
    asset_ids: config.asset_ids,
    data: tokens
  })

  await sms.save({
    program_id: program.get('id'),
    phone_number_id: phone_number.get('id')
  }, {
    transacting: req.trx,
    patch: true
  })

  return {
    action: {
      sms_id: sms.get('id'),
      data: {
        message: config.message
      }
    }
  }

}

export default smsMessage
