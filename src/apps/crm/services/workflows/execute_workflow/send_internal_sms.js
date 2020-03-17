import client from '../../../../../core/services/twilio'

const sendInternalSms = async (req, { config, enrollment, tokens }) => {

  await enrollment.load(['workflow.program.phone_number'], {
    transacting: req.trx
  })

  await client.messages.create({
    from: enrollment.related('workflow').related('program').related('phone_number').get('number'),
    to: config.number,
    body: config.message,
    asset_ids: config.asset_ids,
    data: tokens
  })

  return {}

}

export default sendInternalSms
