import { sendSMS } from '../../../../maha/services/smses'
import { getFormattedNumber } from '../../phone_numbers'
import { getEnrollmentData } from './utils'
import _ from 'lodash'

const getPhoneNumber = async (req, { contact, data }) => {

  const phone = _.get(data, 'phone') || contact.get('phone') || null

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

const sendSms = async (req, { config, contact, enrollment, tokens }) => {

  await enrollment.load(['workflow.program.phone_number'], {
    transacting: req.trx
  })

  const program = enrollment.related('workflow').related('program')

  const data = await getEnrollmentData(req, {
    enrollment
  })

  const phone_number = await getPhoneNumber(req, {
    contact,
    data
  })

  if(!phone_number) return {}

  await sendSMS(req, {
    from: program.related('phone_number').get('number'),
    to: phone_number.get('number'),
    body: config.message,
    asset_ids: config.asset_ids,
    data: tokens
  })

  return {}

}

export default sendSms
