import GenerateScreenshotQueue from '../../queues/generate_screenshot_queue'
import generateCode from '../../../../core/utils/generate_code'
import { audit } from '../../../../core/services/routes/audit'
import { getDefaultConfig } from '../../services/email'
import WorkflowStep from '../../models/workflow_step'
import Template from '../../../crm/models/template'
import Workflow from '../../models/workflow'
import Email from '../../models/email'

const getTriggerType = ({ form, event, store }) => {
  if(store) return 'order'
  if(form) return 'response'
  if(event) return 'event'
}

const createConfirmationWorkflow = async(req, params) => {

  const { form, event, program_id, reply_to, template_id, sender_id, store, subject } = params

  const workflowCode = await generateCode(req, {
    table: 'crm_workflows'
  })

  const workflow = await Workflow.forge({
    team_id: req.team.get('id'),
    form_id: form ? form.get('id') : null,
    event_id: event ? event.get('id') : null,
    store_id: store ? store.get('id') : null,
    program_id,
    code: workflowCode,
    status: 'active',
    title: 'Confirmation Workflow',
    trigger_type: getTriggerType({ form, event, store })
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: workflow
  })

  const template = template_id ? await Template.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('program_id', program_id)
    qb.where('id', template_id)
  }).fetch({
    transacting: req.trx
  }) : null

  const emailCode = await generateCode(req, {
    table: 'crm_emails'
  })

  const email = await Email.forge({
    team_id: req.team.get('id'),
    workflow_id: workflow.get('id'),
    form_id: form ? form.get('id') : null,
    event_id: event ? event.get('id') : null,
    store_id: store ? store.get('id') : null,
    program_id,
    title: 'Confirmation Email',
    code: emailCode,
    config: {
      ...template ? template.get('config') : getDefaultConfig(),
      settings: {
        sender_id,
        subject,
        reply_to
      }
    }
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: email
  })

  const stepCode = await generateCode(req, {
    table: 'crm_workflow_steps'
  })

  await WorkflowStep.forge({
    team_id: req.team.get('id'),
    workflow_id: workflow.get('id'),
    type: 'communication',
    action: 'email',
    code: stepCode,
    delta: 0,
    parent: null,
    answer: null,
    is_active: true,
    config: {
      email_id: email.get('id')
    }
  }).save(null, {
    transacting: req.trx
  })

  const model = form || event || store

  await model.save({
    workflow_id: workflow.get('id')
  }, {
    transacting: req.trx,
    patch: true
  })

  await GenerateScreenshotQueue.enqueue(req, {
    email_id: email.get('id')
  })

}

export default createConfirmationWorkflow
