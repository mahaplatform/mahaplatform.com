import WorkflowEnrollment from '../models/workflow_enrollment'
import { executeWorkflow } from '../services/workflows'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {

  const { enrollment_id, code } = job.data

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('id', enrollment_id)
  }).fetch({
    transacting: req.trx
  })

  await executeWorkflow(req, { enrollment, code })

}

const ExecuteWorkflowQueue = new Queue({
  name: 'execute_workflow',
  processor
})

export default ExecuteWorkflowQueue
