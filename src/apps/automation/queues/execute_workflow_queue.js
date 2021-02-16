import { executeWorkflow } from '../services/workflows'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {
  await executeWorkflow(req, job.data)
}

const ExecuteWorkflowQueue = new Queue({
  queue: 'worker',
  name: 'execute_workflow',
  processor
})

export default ExecuteWorkflowQueue
