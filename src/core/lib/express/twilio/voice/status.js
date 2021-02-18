import TwilioStatusQueue from '@apps/maha/queues/twilio_status_queue'
import { executeHooks } from '@core/services/hooks'
import socket from '@core/services/routes/emitter'
import Call from '@apps/maha/models/call'
import twilio from '@core/vendor/twilio'

const getParent = async (sid) => {
  const twcall = await twilio.calls(sid).fetch()
  if(!twcall.parentCallSid) return twcall
  return await getParent(twcall.parentCallSid)
}

const statusRoute = async (req, res) => {

  const call = await Call.query(qb => {
    if(req.params.id) {
      qb.where('id', req.params.id)
    } else if(req.body.CallSid) {
      qb.where('sid', req.body.ParentCallSid || req.body.CallSid)
    }
  }).fetch({
    withRelated: ['to_number','from_number','team'],
    transacting: req.trx
  })

  if(!call) return res.status(200).send(null)

  req.team = call.related('team')

  const parent = await getParent(req.body.CallSid)

  await TwilioStatusQueue.enqueue(req, {
    parent_sid: parent.sid,
    sid: req.body.CallSid,
    body: req.body
  }, {
    delay: 5000
  })

  await executeHooks(req, 'voice-status', {
    call,
    sid: req.body.CallSid,
    status: req.body.CallStatus,
    error_code: req.body.ErrorCode
  })

  await socket.message(req, {
    channel: '/calls',
    action: 'callstatus',
    data: {
      parent_sid: parent.sid,
      sid: req.body.CallSid,
      direction:req.body.Direction,
      from: req.body.From,
      to: req.body.To,
      status: req.body.CallStatus
    }
  })

  await socket.refresh(req, [
    '/admin/team/calls',
    `/admin/calls/${call.get('id')}`
  ])

  res.status(200).send(true)

}

export default statusRoute
