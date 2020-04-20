import { sendSMS } from '../../../../maha/services/smses'

const sendSms = async (req, { config, contact, enrollment, tokens }) => {

  await enrollment.load(['workflow.program.phone_number'], {
    transacting: req.trx
  })

  if(!contact.get('phone')) {
    return { unenroll: true }
  }

  await sendSMS(req, {
    from: enrollment.related('workflow').related('program').related('phone_number').get('number'),
    to: contact.get('phone'),
    body: config.message,
    asset_ids: config.asset_ids,
    data: tokens
  })

  return {}

}

export default sendSms
