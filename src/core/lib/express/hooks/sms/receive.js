import PhoneNumber from '../../../../../apps/maha/models/phone_number'
import { receiveSMS } from '../../../../../apps/maha/services/smses'
import socket from '../../../../services/routes/emitter'
import twilio from '../../../../services/twilio'

const receiveRoute = async (req, res) => {

  const incoming = req.body

  const message = await twilio.messages(incoming.MessageSid).fetch()

  const { body, from, sid, to } = message

  const phone_number = await PhoneNumber.where({
    number: to
  }).fetch({
    transacting: req.trx
  })

  await receiveSMS(req, {
    team_id: phone_number.get('team_id'),
    from,
    to,
    body,
    incoming,
    sid
  })

  await socket.refresh(req, [
    '/admin/team/sms'
  ])

  res.status(200).send(true)

}

export default receiveRoute
