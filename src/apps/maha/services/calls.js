import InitiateCallQueue from '../queues/initiate_call_queue'
import twilio from '../../../core/services/twilio'
import { findOrCreateNumber } from './numbers'
import Call from '../models/call'
import moment from 'moment'

export const receiveCall = async (req, params) => {

  const from = await findOrCreateNumber(req, {
    number: params.from
  })

  const to = await findOrCreateNumber(req, {
    number: params.to
  })

  const { sid, status } = params

  const call = await Call.forge({
    team_id: params.team_id,
    from_id: from.get('id'),
    to_id: to.get('id'),
    direction: 'inbound',
    sid,
    status,
    received_at: moment()
  }).save(null, {
    transacting: req.trx
  })

  return call

}

export const createCall = async (req, params) => {

  const from = await findOrCreateNumber(req, {
    number: params.from
  })

  const to = await findOrCreateNumber(req, {
    number: params.to
  })

  const call = await Call.forge({
    team_id: req.team.get('id'),
    from_id: from.get('id'),
    to_id: to.get('id'),
    direction: 'outbound',
    body: params.body
  }).save(null, {
    transacting: req.trx
  })

  await InitiateCallQueue.enqueue(req, {
    id: call.get('id')
  })

  return call

}

export const initiateCall = async (req, { id }) => {

  const call = await Call.query(qb => {
    qb.where('id', id)
  }).fetch({
    withRelated: ['from','to'],
    transacting: req.trx
  })

  try {

    const result = twilio.calls.create({
      statusCallback: `${process.env.TWIML_HOST}/voice/feedback`,
      statusCallbackEvent: ['initiated','answered','completed'],
      statusCallbackMethod: 'POST',
      machineDetection: 'DetectMessageEnd',
      from: call.related('from').get('number'),
      to: call.related('to').get('number'),
      url: `${process.env.TWIML_HOST}/voice`
    })

    await call.save({
      sid: result.sid,
      status: 'queued',
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
