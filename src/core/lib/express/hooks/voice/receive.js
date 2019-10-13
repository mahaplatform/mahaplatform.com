import PhoneNumber from '../../../../../apps/maha/models/phone_number'
import { receiveCall } from '../../../../../apps/maha/services/calls'
import collectObjects from '../../../../utils/collect_objects'
import socket from '../../../../services/routes/emitter'
import twilio from '../../../../services/twilio'

const voiceFiles = collectObjects('hooks/voice/*')

const receiveRoute = async (req, res) => {

  const incoming = req.body

  const { from, sid, to, status } = await twilio.calls(incoming.CallSid).fetch()

  const phone_number = await PhoneNumber.where({
    number: to
  }).fetch({
    transacting: req.trx
  })

  const call = await receiveCall(req, {
    team_id: phone_number.get('team_id'),
    from,
    to,
    sid,
    status
  })

  const response = await Promise.reduce(voiceFiles, async (response, hook) => {
    return await hook.default(req, call)
  }, null)

  await socket.refresh(req, [
    '/admin/team/calls'
  ])

  if(response) return res.status(200).type('text/xml').send(response)

  res.status(200).send(null)


}

export default receiveRoute
