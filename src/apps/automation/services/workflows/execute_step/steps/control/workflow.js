import { enrollInWorkflow } from '@apps/automation/services/enrollments'
import Workflow from '@apps/automation/models/workflow'

const workflowStep = async (req, { contact, config, step }) => {

  const { workflow_id } = step.config

  const workflow = await Workflow.query(qb => {
    qb.where('id', workflow_id)
  }).fetch({
    transacting: req.trx
  })

  await enrollInWorkflow(req, {
    contact,
    workflow
  })

  return {
    action: {
      workflow_id: config.workflow_id
    }
  }

}

export default workflowStep
