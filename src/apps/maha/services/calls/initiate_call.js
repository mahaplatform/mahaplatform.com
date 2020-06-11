import twilio from '../../../../core/services/twilio'
import Call from '../../models/call'
import moment from 'moment'

const initiateCall = async (req, { call_id, method, url }) => {

  const call = await Call.query(qb => {
    qb.where('id', call_id)
  }).fetch({
    withRelated: ['from','to'],
    transacting: req.trx
  })

  try {

    const result = await twilio.calls.create({
      statusCallback: `${process.env.TWIML_HOST}/voice/status`,
      statusCallbackEvent: ['ringing','answered','completed'],
      statusCallbackMethod: 'POST',
      machineDetection: 'DetectMessageEnd',
      from: call.related('from').get('number'),
      to: call.related('to').get('number'),
      method: method || 'POST',
      url: url || `${process.env.TWIML_HOST}/voice`
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
