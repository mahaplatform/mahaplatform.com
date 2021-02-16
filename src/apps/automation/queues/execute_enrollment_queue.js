import { executeEnrollment } from '@apps/automation/services/workflows'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {
  await executeEnrollment(req, job.data)
}

const ExecuteEnrollmentQueue = new Queue({
  queue: 'worker',
  name: 'execute_enrollment',
  processor
})

export default ExecuteEnrollmentQueue
