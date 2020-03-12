import { executeWorkflow } from '../services/workflows'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {

  await executeWorkflow(req, {
    enrollment_id: job.data.enrollment_id,
    code: job.data.code
  })

}

const ExecuteWorkflowQueue = new Queue({
  name: 'execute_workflow',
  processor
})

export default ExecuteWorkflowQueue
