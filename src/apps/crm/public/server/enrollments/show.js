import WorkflowEnrollment from '../../../models/workflow_enrollment'
import { executeWorkflow } from '../../../services/workflows'

const showRoute = async (req, res) => {

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('code', req.params.enrollment_code)
  }).fetch({
    withRelated: ['team','workflow.steps'],
    transacting: req.trx
  })

  req.team = enrollment.related('team')

  const result = await executeWorkflow(req, {
    enrollment_id: enrollment.get('id'),
    code: req.params.code
  })

  if(result.twiml) {
    return res.status(200).type('text/xml').send(result.twiml)
  }

  res.status(200).respond(true)

}

export default showRoute
