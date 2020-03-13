import Workflow from '../../../models/workflow'
import * as enrollments from '../enrollment'

const enrollInWorkflow = async (req, params) => {

  const { config, enrollment } = params

  const workflow = await Workflow.query(qb => {
    qb.where('id', config.workflow_id)
  }).fetch({
    transacting: req.trx
  })

  await enrollments.enrollInWorkflow(req, {
    contact: enrollment.related('contact'),
    workflow
  })

  return {}

}

export default enrollInWorkflow
