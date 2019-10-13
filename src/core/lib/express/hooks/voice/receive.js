import PhoneNumber from '../../../../../apps/maha/models/phone_number'
import { receiveCall } from '../../../../../apps/maha/services/calls'
import socket from '../../../../services/routes/emitter'
import twilio from '../../../../services/twilio'

const receiveRoute = async (req, res) => {

  const incoming = req.body

  const call = await twilio.calls(incoming.CallSid).fetch()

  const { from, sid, to, status } = call

  const phone_number = await PhoneNumber.where({
    number: to
  }).fetch({
    transacting: req.trx
  })

  await receiveCall(req, {
    team_id: phone_number.get('team_id'),
    from,
    to,
    sid,
    status
  })

  await socket.refresh(req, [
    '/admin/team/calls'
  ])

  res.status(200).send(true)

}

export default receiveRoute
