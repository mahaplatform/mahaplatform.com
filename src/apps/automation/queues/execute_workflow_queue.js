import { executeWorkflow } from '../services/workflows'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  await executeWorkflow(req, {
    ...job.data
  })

}

const ExecuteWorkflowQueue = new Queue({
  name: 'execute_workflow',
  processor
})

export default ExecuteWorkflowQueue
