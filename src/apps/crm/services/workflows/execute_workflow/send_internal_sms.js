import client from '../../../../../core/services/twilio'

const sendInternalSms = async (req, { config, enrollment }) => {

  await enrollment.load(['contact','workflow.program.phone_number'], {
    transacting: req.trx
  })

  const contact = enrollment.related('contact')

  await client.messages.create({
    from: enrollment.related('workflow').related('program').related('phone_number').get('number'),
    to: config.number,
    body: config.message,
    asset_ids: config.asset_ids,
    data: {
      contact: {
        full_name: contact.get('full_name'),
        first_name: contact.get('full_name'),
        last_name: contact.get('full_name')
      }
    }
  })

  return {}

}

export default sendInternalSms
