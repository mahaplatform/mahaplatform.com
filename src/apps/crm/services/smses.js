import twilio from '../../../core/services/twilio'
import SMS from '../models/sms'
import moment from 'moment'

export const sendSMS = async (req, { id }) => {

  const sms = await SMS.query(qb => {
    qb.where('id', id)
  }).fetch({
    withRelated: ['contact','number','phone_number'],
    transacting: req.trx
  })

  try {

    const message = await twilio.messages.create({
      from: sms.related('number').get('number'),
      to: sms.related('phone_number').get('number'),
      body: sms.get('body')
    })

    await sms.save({
      sid: message.sid,
      status: 'sent',
      sent_at: moment()
    }, {
      transacting: req.trx
    })

  } catch(err) {

    await sms.save({
      status: 'failed'
    }, {
      transacting: req.trx
    })

  }

}
