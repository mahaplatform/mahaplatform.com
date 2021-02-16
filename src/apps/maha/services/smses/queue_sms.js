import twilio from '@core/vendor/twilio'
import SMS from '@apps/maha/models/sms'
import moment from 'moment'

const getTotal = async (req, { from_id, to_id, sms_id }) => {

  const results = await req.trx('maha_smses').where(qb => {
    qb.where('from_number_id', from_id)
    qb.where('to_number_id', to_id)
    qb.whereNot('id', sms_id)
  }).count('*')

  return parseInt(results[0].count)

}

const queueSMS = async (req, { sms_id }) => {

  const sms = await SMS.query(qb => {
    qb.where('id', sms_id)
  }).fetch({
    withRelated: ['to_number','from_number','attachments.asset'],
    transacting: req.trx
  })

  const from_number = sms.related('from_number')

  const to_number = sms.related('to_number')

  try {

    const result = await twilio.messages.create({
      from: from_number.get('number'),
      to: to_number.get('number'),
      body: sms.get('body'),
      mediaUrl: sms.related('attachments').map(attachment => {
        return attachment.related('asset').get('signed_url')
      }),
      statusCallbackMethod: 'POST',
      statusCallback: `${process.env.TWIML_HOST}/sms/status`
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
