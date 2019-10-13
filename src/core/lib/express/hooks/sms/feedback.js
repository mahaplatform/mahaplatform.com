import { updateSMS } from '../../../../../apps/maha/services/smses'
import socket from '../../../../services/routes/emitter'
import twilio from '../../../../services/twilio'

const feedbackRoute = async (req, res) => {

  const message = await twilio.messages(req.body.MessageSid).fetch()

  await updateSMS(req, {
    price: Math.abs(message.price),
    sid: message.sid,
    status: message.status
  })

  await socket.refresh(req, [
    '/admin/team/smses'
  ])

  res.status(200).send(true)

}

export default feedbackRoute
