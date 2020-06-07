import { executeWorkflow } from '../../../services/workflows'
import twilio from '../../../../../core/services/twilio'
import Call from '../../../../maha/models/call'
import { twiml } from 'twilio'

const getResponse = async (req, { call, duration, status }) => {

  if(!call.related('enrollment').get('id')) {
    const response = new twiml.VoiceResponse()
    response.hangup()
    return response.toString()
  }

  const result = await executeWorkflow(req, {
    enrollment_id: call.related('enrollment').get('id'),
    code: req.body.params.code,
    execute: false,
    call: {
      duration,
      status,
      user_id: req.user.get('id')
    }
  })

  return result.toString()

}

const hangupRoute = async (req, res) => {

  const call = await Call.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['team', 'enrollment'],
    transacting: req.trx
  })

  if(!call) return res.status(404).respond({
    code: 404,
    message: 'Unable to load call'
  })

  const twcall = await twilio.calls(call.get('sid')).fetch()

  const { duration, status } = twcall

  const twiml = await getResponse(req, {
    call,
    duration,
    status
  })

  twilio.calls(call.get('sid')).update({ twiml })

  res.status(200).respond(true)

}

export default hangupRoute
