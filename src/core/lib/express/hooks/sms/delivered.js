import { createSMS, updateSMS } from '../../../../../apps/maha/services/smses'
import PhoneNumber from '../../../../../apps/maha/models/phone_number'
import SMS from '../../../../../apps/maha/models/sms'
import socket from '../../../../services/routes/emitter'
import twilio from '../../../../services/twilio'

const deliveredRoute = async (req, res) => {

  const message = await twilio.messages(req.body.MessageSid).fetch()

  const phone_number = await PhoneNumber.where({
    number: message.from
  }).fetch({
    transacting: req.trx
  })

  const sms = await SMS.query(qb => {
    qb.where('sid', message.sid)
  }).fetch({
    transacting: req.trx
  })

  if(!sms) {
    await createSMS(req, {
      team_id: phone_number.get('team_id'),
      sid: message.sid,
      from: message.from,
      to: message.to,
      body: message.body
    })
  }

  await updateSMS(req, {
    price: Math.abs(message.price),
    sid: message.sid,
    status: message.status
  })

  await socket.refresh(req, [
    '/admin/team/sms'
  ])

  res.status(200).send(null)

}

export default deliveredRoute
