import twilio from '../../../core/services/twilio'
import SMS from '../models/sms'
import moment from 'moment'

export const sendSMS = async (req, { id }) => {

  const sms = await SMS.query(qb => {
    qb.where('id', id)
  }).fetch({
    withRelated: ['number','phone_number'],
    transacting: req.trx
  })

  try {

    console.log({
      from: sms.related('number').get('number'),
      to: sms.related('phone_number').get('number'),
      body: sms.get('body')
    })

    const result = await twilio.messages.create({
      from: sms.related('number').get('number'),
      to: sms.related('phone_number').get('number'),
      body: sms.get('body')
    })

    await sms.save({
      sid: result.sid,
      status: 'sent',
      sent_at: moment()
    }, {
      transacting: req.trx
    })

  } catch(err) {

    console.log(err)

    await sms.save({
      status: 'failed'
    }, {
      transacting: req.trx
    })

  }

}
