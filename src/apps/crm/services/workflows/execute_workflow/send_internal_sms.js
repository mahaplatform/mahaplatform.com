import client from '../../../../../core/services/twilio'

export const sendInternalSms = async (req, params) => {

  const { config, enrollment } = params

  const { number, message } = config

  await enrollment.load(['workflow.program.phone_number'], {
    transacting: req.trx
  })

  await client.messages.create({
    body: message,
    from: enrollment.related('workflow').related('program').related('phone_number').get('number'),
    to: number
  })

  return {}

}
