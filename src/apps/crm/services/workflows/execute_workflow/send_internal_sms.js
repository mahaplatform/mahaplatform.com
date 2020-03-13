import client from '../../../../../core/services/twilio'
import ejs from 'ejs'

const sendInternalSms = async (req, params) => {

  const { config, enrollment } = params

  await enrollment.load(['contact','workflow.program.phone_number'], {
    transacting: req.trx
  })

  const contact = enrollment.related('contact')

  const message = ejs.render(config.message, {
    contact: {
      full_name: contact.get('full_name'),
      first_name: contact.get('full_name'),
      last_name: contact.get('full_name')
    }
  })

  await client.messages.create({
    body: message,
    from: enrollment.related('workflow').related('program').related('phone_number').get('number'),
    to: config.number
  })

  return {}

}

export default sendInternalSms
