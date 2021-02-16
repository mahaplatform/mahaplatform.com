import { updateCall } from '@apps/maha/services/calls'
import { executeHooks } from '@core/services/hooks'
import socket from '@core/services/routes/emitter'
import Call from '@apps/maha/models/call'

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

  // if(!req.body.ParentCallSid) {
  //
  //   if(req.body.CallStatus === 'completed') {
  //     await updateCall(req, {
  //       call,
  //       status: req.body.CallStatus
  //     })
  //   }
  //
  // } else {
  //
  //   if(req.body.CallStatus === 'ringing' && call.get('status') !== 'transferring') {
  //     await updateCall(req, {
  //       call,
  //       status: 'dialing'
  //     })
  //   }
  //
  //   if(req.body.CallStatus === 'in-progress') {
  //     await updateCall(req, {
  //       call,
  //       status: 'in-progress'
  //     })
  //   }
  // }

  await executeHooks(req, 'voice-status', {
    call,
    sid: req.body.CallSid,
    status: req.body.CallStatus,
    error_code: req.body.ErrorCode
  })

  await socket.refresh(req, [
    '/admin/team/calls',
    `/admin/calls/${call.get('id')}`
  ])

  res.status(200).send(null)

}

export default statusRoute
