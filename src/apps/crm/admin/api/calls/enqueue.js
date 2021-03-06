import { updateCall } from '@apps/maha/services/calls'
import twilio from '@core/vendor/twilio'
import Call from '@apps/maha/models/call'
import { twiml } from 'twilio'

const enqueueRoute = async (req, res) => {

  const call = await Call.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!call) return res.status(404).respond({
    code: 404,
    message: 'Unable to load call'
  })

  await updateCall(req, {
    call,
    status: 'on-hold'
  })

  const response = new twiml.VoiceResponse()

  response.enqueue(`call-${call.get('id')}`)

  twilio.calls(call.get('sid')).update({
    twiml: response.toString()
  })

  await res.status(200).respond(true)

}

export default enqueueRoute
