import { sendSMS } from '../../../../maha/services/smses'

const smsQuestion = async (req, { config, contact, enrollment, step, answer, tokens }) => {

  if(answer) {
    return {
      data: {
        [config.code]: answer
      }
    }
  }

  await enrollment.load(['sms_campaign.program.phone_number'], {
    transacting: req.trx
  })

  await sendSMS(req, {
    from: enrollment.related('sms_campaign').related('program').related('phone_number').get('number'),
    to: contact.get('phone'),
    body: config.message,
    asset_ids: config.asset_ids,
    data: tokens
  })

  return {
    wait: true
  }

}

export default smsQuestion
