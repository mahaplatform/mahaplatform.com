import WorkflowEnrollment from '../../models/workflow_enrollment'
import { executeWorkflow } from '../../services/workflows'
import twilio from '../../../../core/services/twilio'

const dialRoute = async (req, res) => {

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('code', req.params.enrollment_code)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  if(!enrollment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load enrollment'
  })

  req.team = enrollment.related('team')

  const call = await twilio.calls(req.body.CallSid).fetch()

  const { duration, status, to } = call

  const matches = status === 'completed' ? to.match(/^client:user-(.*)$/) : null

  if(status === 'completed' && matches !== null) return

  const result = await executeWorkflow(req, {
    enrollment_id: enrollment.get('id'),
    code: req.params.code,
    execute: false,
    call: {
      duration,
      status,
      user_id: status === 'completed' && matches !== null ? parseInt(matches[1]) : null,
      number: status === 'completed' && matches === null ? call.to : null
    }
  })

  if(result.twiml) {
    return res.status(200).type('text/xml').send(result.twiml)
  }

  res.status(200).respond(true)

}

export default dialRoute
