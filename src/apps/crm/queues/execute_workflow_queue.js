import { executeWorkflow } from '../services/workflows'
import Queue from '../../../core/objects/queue'
import Enrollment from '../models/enrollment'

const processor = async (req, job) => {

  const { enrollment_id, step } = job.data

  const enrollment = await Enrollment.query(qb => {
    qb.where('id', enrollment_id)
  }).fetch({
    withRelated: ['contact','response.form','workflow'],
    transacting: req.trx
  })

  await executeWorkflow(req, { enrollment, step })

}

const ExecuteWorkflowQueue = new Queue({
  name: 'execute_workflow',
  processor
})

export default ExecuteWorkflowQueue
