import twilio from '../../../../../core/services/twilio'
import Call from '../../../../maha/models/call'
import { twiml } from 'twilio'

const getResponse = async (req, { call, duration, status }) => {

  const { enrollment_code, step_code } = req.body.params

  const response = new twiml.VoiceResponse()

  if(enrollment_code) {

    response.redirect(`${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment_code}/${step_code}/dial`)

  } else  {

    response.hangup()

  }

  return response.toString()

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

  const { duration, status } = await twilio.calls(call.get('sid')).fetch()

  const twiml = await getResponse(req, {
    call,
    duration,
    status
  })

  twilio.calls(call.get('sid')).update({ twiml })

  res.status(200).respond(true)

}

export default hangupRoute
