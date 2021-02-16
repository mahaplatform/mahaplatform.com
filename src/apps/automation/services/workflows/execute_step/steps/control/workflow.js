import { enrollInWorkflow } from '@apps/automation/services/enrollments'
import Workflow from '@apps/automation/models/workflow'
import { getNext } from '../utils'

const workflowStep = async (req, { contact, config, state, step }) => {

  const { workflow_id } = step

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
    },
    next: getNext(req, { config, state })
  }

}

export default workflowStep
