import collectObjects from '../../../../utils/collect_objects'
import PhoneNumber from '../../../../../apps/maha/models/phone_number'
import { receiveSMS } from '../../../../../apps/maha/services/smses'
import socket from '../../../../services/routes/emitter'
import twilio from '../../../../services/twilio'

const smsFiles = collectObjects('hooks/sms/*')

const receiveRoute = async (req, res) => {

  const incoming = req.body

  const message = await twilio.messages(incoming.MessageSid).fetch()

  const { body, from, sid, to } = message

  const phone_number = await PhoneNumber.where({
    number: to
  }).fetch({
    transacting: req.trx
  })

  const sms = await receiveSMS(req, {
    team_id: phone_number.get('team_id'),
    from,
    to,
    body,
    incoming,
    sid
  })

  const response = await Promise.reduce(smsFiles, async (response, hook) => {
    return await hook.default(req, sms)
  }, null)

  await socket.refresh(req, [
    '/admin/team/sms'
  ])

  if(response) return res.status(200).type('text/xml').send(response)

  res.status(200).send(null)

}

export default receiveRoute
