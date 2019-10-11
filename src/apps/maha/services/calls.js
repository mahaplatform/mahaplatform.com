import twilio from '../../../core/services/twilio'
import Call from '../models/call'
import moment from 'moment'

export const makeCall = async (req, { id }) => {

  const call = await Call.query(qb => {
    qb.where('id', id)
  }).fetch({
    withRelated: ['number','phone_number'],
    transacting: req.trx
  })

  try {

    const result = twilio.calls.create({
      machineDetection: 'DetectMessageEnd',
      from: call.related('number').get('number'),
      to: call.related('phone_number').get('number'),
      url: `${process.env.TWIML_HOST}/voice`
    })

    await call.save({
      sid: result.sid,
      status: 'sent',
      sent_at: moment()
    }, {
      transacting: req.trx
    })

  } catch(err) {

    await call.save({
      status: 'failed'
    }, {
      transacting: req.trx
    })

  }

}
