import twilio from '../../../../../core/services/twilio'
import Call from '../../../../maha/models/call'
import { twiml } from 'twilio'

const enqueueRoute = async (req, res) => {

  const call = await Call.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!call) return res.status(404).respond({
    code: 404,
    message: 'Unable to load call'
  })

  const response = new twiml.VoiceResponse()

  response.enqueue({}, `user-${req.user.get('id')}`)

  twilio.calls(call.get('sid')).update({
    twiml: response.toString()
  })

  res.status(200).respond(true)

}

export default enqueueRoute
