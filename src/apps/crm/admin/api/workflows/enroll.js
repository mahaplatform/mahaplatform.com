import ExecuteWorkflowQueue from '../../../queues/execute_workflow_queue'
import WorkflowEnrollment from '../../../models/workflow_enrollment'
import generateCode from '../../../../../core/utils/generate_code'
import { toFilter } from '../../../../../core/utils/criteria'
import { getContacts } from '../../../services/contacts'
import Workflow from '../../../models/workflow'

const enrollRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.select('crm_workflows.*','crm_workflow_results.*')
    qb.innerJoin('crm_workflow_results','crm_workflow_results.workflow_id','crm_workflows.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  const contacts = await getContacts(req, {
    filter: toFilter(req.body.criteria)
  })

  await Promise.map(contacts, async (contact) => {

    const code = await generateCode(req, {
      table: 'crm_workflow_enrollments'
    })

    const enrollment = await WorkflowEnrollment.forge({
      team_id: req.team.get('id'),
      workflow_id: workflow.get('id'),
      contact_id: contact.get('id'),
      code,
      was_completed: false,
      was_converted: false
    }).save(null, {
      transacting: req.trx
    })

    await ExecuteWorkflowQueue.enqueue(req, {
      enrollment_id: enrollment.get('id')
    })

  })

  res.status(200).respond(true)

}

export default enrollRoute
