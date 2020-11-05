import Workflow from '@apps/automation/models/workflow'
import * as enrollments from '../../../enrollment'

const workflowStep = async (req, { config, enrollment }) => {

  const workflow = await Workflow.query(qb => {
    qb.where('id', config.workflow_id)
  }).fetch({
    transacting: req.trx
  })

  await enrollments.enrollInWorkflow(req, {
    contact: enrollment.related('contact'),
    workflow
  })

  return {
    action: {
      workflow_id: config.workflow_id
    }
  }

}

export default workflowStep
