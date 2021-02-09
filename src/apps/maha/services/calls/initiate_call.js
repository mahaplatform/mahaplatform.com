import twilio from '@core/vendor/twilio'
import Call from '@apps/maha/models/call'
import moment from 'moment'

const initiateCall = async (req, { call_id, method, url }) => {

  const call = await Call.query(qb => {
    qb.where('id', call_id)
  }).fetch({
    withRelated: ['from_number','to_number'],
    transacting: req.trx
  })

  try {

    const result = await twilio.calls.create({
      // statusCallback: `${process.env.TWILIO_HOST_STATUS}/voice-status`,
      // statusCallbackEvent: ['initiated','ringing','answered','completed'],
      // statusCallbackMethod: 'POST',
      machineDetection: 'DetectMessageEnd',
      from: call.related('from_number').get('number'),
      to: call.related('to_number').get('number'),
      method: method || 'POST',
      url: url || `${process.env.TWILIO_HOST_TWIML}/voice`
    })

    await call.save({
      sid: result.sid,
      status: 'queued',
      sent_at: moment()
    }, {
      patch: true,
      transacting: req.trx
    })

  } catch(err) {

    await call.save({
      status: 'failed'
    }, {
      patch: true,
      transacting: req.trx
    })

  }

  return call

}

export default initiateCall
