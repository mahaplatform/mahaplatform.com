import { updateSMS } from '../../../../apps/maha/services/smses'
import collectObjects from '../../../utils/collect_objects'
import socket from '../../../services/routes/emitter'
import Sms from '../../../../apps/maha/models/sms'
import twilio from '../../../services/twilio'

const hooks = collectObjects('hooks/sms/status.js')

const statusRoute = async (req, res) => {

  const message = await twilio.messages(req.body.MessageSid).fetch()

  const error_code = req.body.ErrorCode

  const { price, sid, status } = message

  const sms = await Sms.query(qb => {
    qb.where('sid', sid)
  }).fetch({
    withRelated: ['to','from','team'],
    transacting: req.trx
  })

  req.team = sms.related('team')

  await updateSMS(req, {
    price: Math.abs(price),
    sid,
    status,
    error_code
  })

  await Promise.reduce(hooks, async (response, hook) => {
    return await hook.default(req, {
      sms,
      status,
      error_code
    })
  }, null)

  await socket.refresh(req, [
    '/admin/team/smses'
  ])

  res.status(200).send(null)

}

export default statusRoute
