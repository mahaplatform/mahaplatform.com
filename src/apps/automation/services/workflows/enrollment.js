import ExecuteWorkflowQueue from '@apps/automation/queues/execute_workflow_queue'
import { contactActivity } from '@apps/crm/services/activities'
import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import generateCode from '@core/utils/generate_code'
import Workflow from '@apps/automation/models/workflow'

export const enrollInWorkflows = async (req, params) => {

  const { contact, trigger_type, action, form_id, event_id, store_id, order, response, registration, email, email_campaign_id, list_id, topic_id } = params

  const workflows = await Workflow.query(qb => {
    qb.where('trigger_type', trigger_type)
    qb.whereNull('deleted_at')
    qb.where('status', 'active')
    if(action) qb.where('action', action)
    if(topic_id) qb.where('topic_id', topic_id)
    if(list_id) qb.where('list_id', list_id)
    if(form_id) qb.where('form_id', form_id)
    if(event_id) qb.where('event_id', event_id)
    if(store_id) qb.where('store_id', store_id)
    if(email_campaign_id) qb.where('email_campaign_id', email_campaign_id)
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  if(!workflows) return

  await Promise.mapSeries(workflows, async(workflow) => {
    await enrollInWorkflow(req, {
      contact,
      workflow,
      email,
      order,
      response,
      registration
    })
  })

}

export const enrollInWorkflow = async (req, { contact, workflow, email, response, registration, order }) => {

  const existing = WorkflowEnrollment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('workflow_id', workflow.get('id'))
    qb.where('contact_id', contact.get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(existing && workflow.get('is_unique')) return false

  const code = await generateCode(req, {
    table: 'crm_workflow_enrollments'
  })

  const enrollment = await WorkflowEnrollment.forge({
    team_id: req.team.get('id'),
    workflow_id: workflow.get('id'),
    contact_id: contact.get('id'),
    response_id: response ? response.get('id') : null,
    registration_id: registration ? registration.get('id') : null,
    email_id: email ? email.get('id') : null,
    order_id: order ? order.get('id') : null,
    code,
    data: {},
    status: 'active',
    was_converted: false
  }).save(null, {
    transacting: req.trx
  })

  if(!response && !registration && !email) {
    await contactActivity(req, {
      contact,
      type: 'workflow',
      story: 'enrolled contact in workflow',
      program_id: workflow.get('program_id'),
      user: req.user,
      data: {
        workflow_id: workflow.get('id'),
        enrollment_id: enrollment.get('id')
      }
    })
  }

  await ExecuteWorkflowQueue.enqueue(req, {
    enrollment_id: enrollment.get('id')
  })

}