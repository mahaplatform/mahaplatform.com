import GetCallPriceQueue from '../../../../apps/maha/queues/get_call_price_queue'
import { updateCall } from '../../../../apps/maha/services/calls'
import collectObjects from '../../../utils/collect_objects'
import socket from '../../../services/routes/emitter'
import Call from '../../../../apps/maha/models/call'
import moment from 'moment'

const hooks = collectObjects('hooks/voice/status.js')

const statusRoute = async (req, res) => {

  const call = await Call.query(qb => {
    if(req.params.id) {
      qb.where('id', req.params.id)
    } else if(req.body.CallSid) {
      qb.where('sid', req.body.ParentCallSid || req.body.CallSid)
    }
  }).fetch({
    withRelated: ['to','from','team'],
    transacting: req.trx
  })

  if(!call) return res.status(200).send(null)

  req.team = call.related('team')

  if(!req.body.ParentCallSid) {

    if(req.body.CallStatus === 'completed') {

      await updateCall(req, {
        call,
        status: req.body.CallStatus
      })

      await GetCallPriceQueue.enqueue(req, {
        id: call.get('id')
      }, {
        until: moment().add(5, 'minutes')
      })
    }

  } else {

    if(req.body.CallStatus === 'ringing' && call.get('status') !== 'transferring') {
      await updateCall(req, {
        call,
        status: 'dialing'
      })
    }

    if(req.body.CallStatus === 'in-progress') {
      await updateCall(req, {
        call,
        status: 'in-progress'
      })
    }
  }

  await Promise.reduce(hooks, async (response, hook) => {
    return await hook.default(req, {
      call,
      status: req.body.CallStatus
    })
  }, null)

  await socket.refresh(req, [
    '/admin/team/calls',
    `/admin/calls/${call.get('id')}`
  ])

  res.status(200).send(null)

}

export default statusRoute
