import { updateSMS } from '@apps/maha/services/smses'
import { executeHooks } from '@core/services/hooks'
import socket from '@core/services/routes/emitter'
import Sms from '@apps/maha/models/sms'

const statusRoute = async (req, res) => {

  const sms = await Sms.query(qb => {
    qb.where('sid', req.body.MessageSid)
  }).fetch({
    withRelated: ['to_number','from_number','team'],
    transacting: req.trx
  })

  req.team = sms.related('team')

  await updateSMS(req, {
    sid: req.body.MessageSid,
    status: req.body.MessageStatus,
    error_code: req.body.ErrorCode
  })

  await executeHooks(req, 'sms-status', {
    sms,
    sid: req.body.MessageSid,
    status: req.body.MessageStatus,
    error_code: req.body.ErrorCode
  })

  await socket.refresh(req, [
    '/admin/team/smses'
  ])

  res.status(200).send(null)

}

export default statusRoute
