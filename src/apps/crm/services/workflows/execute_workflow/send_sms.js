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

const getWorkflow = async (req, { enrollment }) => {

  await enrollment.load(['workflow','sms_campaign','voice_campaign'], {
    transacting: req.trx
  })

  if(enrollment.get('workflow_id')) return enrollment.related('workflow')

  if(enrollment.get('sms_campaign_id')) return enrollment.related('sms_campaign')

  if(enrollment.get('voice_campaign_id')) return enrollment.related('voice_campaign')

}

const sendSms = async (req, { config, contact, enrollment, tokens }) => {

  const workflow = await getWorkflow(req, { enrollment })

  await workflow.load(['program.phone_number'], {
    transacting: req.trx
  })

  const program = workflow.related('program')

  const data = await getEnrollmentData(req, {
    enrollment
  })

  const phone_number = await getPhoneNumber(req, {
    contact,
    data
  })

  if(!phone_number) return {}

  const sms = await sendSMS(req, {
    from: program.related('phone_number').get('number'),
    to: phone_number.get('number'),
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

  return {}

}

export default sendSms
