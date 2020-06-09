import ExecuteWorkflowQueue from '../../../queues/execute_workflow_queue'
import WorkflowEnrollment from '../../../models/workflow_enrollment'
import generateCode from '../../../../../core/utils/generate_code'
import { contactActivity } from '../../../services/activities'
import { getRecipients } from '../../../services/recipients'
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

  const recipients = await getRecipients(req, {
    type: 'all',
    program_id: workflow.get('program_id'),
    purpose: 'transactional',
    ...req.body.to
  }).then(result => result.toArray())

  await Promise.map(recipients, async (recipient) => {

    const code = await generateCode(req, {
      table: 'crm_workflow_enrollments'
    })

    const enrollment = await WorkflowEnrollment.forge({
      team_id: req.team.get('id'),
      workflow_id: workflow.get('id'),
      contact_id: recipient.get('contact_id'),
      code,
      data: {},
      status: 'active',
      was_converted: false
    }).save(null, {
      transacting: req.trx
    })

    await contactActivity(req, {
      contact: recipient.related('contact'),
      type: 'workflow',
      story: 'enrolled contact in workflow',
      program_id: workflow.get('program_id'),
      user: req.user,
      data: {
        workflow_id: workflow.get('id'),
        enrollment_id: enrollment.get('id')
      }
    })

    await ExecuteWorkflowQueue.enqueue(req, {
      enrollment_id: enrollment.get('id')
    })

  })

  res.status(200).respond(true)

}

export default enrollRoute
