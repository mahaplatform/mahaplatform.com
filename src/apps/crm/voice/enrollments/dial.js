import WorkflowEnrollment from '@apps/automation/models/enrollment'
import { executeWorkflow } from '@apps/automation/services/workflows'
import twilio from '@core/services/twilio'
import { twiml } from 'twilio'

const dialRoute = async (req, res) => {

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('code', req.params.enrollment_code)
  }).fetch({
    withRelated: ['call','team'],
    transacting: req.trx
  })

  if(!enrollment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load enrollment'
  })

  req.team = enrollment.related('team')

  const call = enrollment.related('call')

  const twcall = await twilio.calls(req.body.DialCallSid).fetch()

  const matches = twcall.to.match(/^client:user-(.*)$/)

  const mobile_answered = !matches && twcall.status === 'completed'

  const maha_answered = matches && twcall.status === 'completed' && req.body.CallStatus === 'completed'

  const rejected = twcall.status === 'busy'

  const no_one_answered = twcall.status === 'no-answer' || call.get('status') === 'completed'

  if(mobile_answered || maha_answered || rejected || no_one_answered) {

    const result = await executeWorkflow(req, {
      enrollment_id: enrollment.get('id'),
      code: req.params.code,
      execute: false,
      call_status: req.body.CallStatus,
      dial: {
        duration: req.body.DialCallDuration,
        status: req.body.DialCallStatus,
        user_id: matches ? parseInt(matches[1]) : null,
        number: !matches ? twcall.to : null
      }
    })

    if(result.twiml) return res.status(200).type('text/xml').send(result.twiml)

  }

  const response = new twiml.VoiceResponse()

  response.hangup()

  return res.status(200).type('text/xml').send(response.toString())

}

export default dialRoute
