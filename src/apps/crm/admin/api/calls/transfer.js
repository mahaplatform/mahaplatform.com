import twilio from '../../../../../core/services/twilio'
import Call from '../../../../maha/models/call'
import { twiml } from 'twilio'

const transferRoute = async (req, res) => {

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

  const dial = response.dial()

  const client = dial.client(`user-${req.body.user_id}`)

  const params = {
    ...req.body.params,
    transfered_from: req.user.get('full_name')
  }

  Object.keys(params).map(name => {
    client.parameter({
      name,
      value: params[name]
    })
  })

  twilio.calls(call.get('sid')).update({
    twiml: response.toString()
  })

  res.status(200).respond(true)

}

export default transferRoute
