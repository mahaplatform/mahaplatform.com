import WorkflowEnrollment from '../../models/workflow_enrollment'
import { executeWorkflow } from '../../services/workflows'

const recordRoute = async (req, res) => {

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

  const result = await executeWorkflow(req, {
    enrollment_id: enrollment.get('id'),
    code: req.params.code,
    execute: true,
    recording: {
      url: req.body.RecordingUrl,
      duration: req.body.RecordingDuration
    }
  }) || {}

  if(result.twiml) {
    return res.status(200).type('text/xml').send(result.twiml)
  }

  res.status(200).respond(true)

}

export default recordRoute
