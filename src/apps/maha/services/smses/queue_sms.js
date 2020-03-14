import twilio from '../../../../core/services/twilio'
import SMS from '../../models/sms'
import moment from 'moment'

const queueSMS = async (req, { id }) => {

  const sms = await SMS.query(qb => {
    qb.where('id', id)
  }).fetch({
    withRelated: ['to','from','attachments.asset'],
    transacting: req.trx
  })

  try {

    const result = await twilio.messages.create({
      from: sms.related('from').get('number'),
      to: sms.related('to').get('number'),
      body: sms.get('body'),
      mediaUrl: sms.related('attachments').map(attachment => {
        return attachment.related('asset').get('signed_url')
      }),
      StatusCallbackMethod: 'POST',
      statusCallback: `${process.env.TWIML_HOST}/sms/feedback`
    })

    await sms.save({
      sid: result.sid,
      status: 'queued',
      sent_at: moment()
    }, {
      patch: true,
      transacting: req.trx
    })

  } catch(err) {

    await sms.save({
      status: 'failed'
    }, {
      patch: true,
      transacting: req.trx
    })

    throw(err)

  }

}

export default queueSMS
