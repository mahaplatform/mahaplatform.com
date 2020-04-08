import generateCode from '../../../../core/utils/generate_code'
import { audit } from '../../../../core/services/routes/audit'
import WorkflowStep from '../../models/workflow_step'
import Workflow from '../../models/workflow'
import Template from '../../models/template'
import Email from '../../models/email'

const getTriggerType = ({ form, event }) => {
  if(form) return 'response'
  if(event) return 'event'
}

const createConfirmationWorkflow = async(req, params) => {

  const { form, event, program_id, template_id, sender_id, subject, reply_to } = params

  const workflowCode = await generateCode(req, {
    table: 'crm_workflows'
  })

  const workflow = await Workflow.forge({
    team_id: req.team.get('id'),
    form_id: form ? form.get('id') : null,
    event_id: event ? event.get('id') : null,
    program_id,
    code: workflowCode,
    status: 'active',
    title: 'Confirmation Workflow',
    trigger_type: getTriggerType({ form, event })
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
    program_id,
    title: 'Confirmation Email',
    code: emailCode,
    config: {
      ...template ? template.get('config') : {
        page: {
          background_color: '#DFDFDF'
        },
        header: {
          blocks: [{
            type: 'web',
            text: '<p>Not displaying correctly? <a href="<%- email.web_link %>">View in browser</a></p>',
            padding: 8,
            p_font_size: 12,
            p_text_align: 'center',
            p_line_height: 1.5
          }]
        },
        body: {
          background_color: '#FFFFFF',
          blocks: [{
            type: 'text',
            content_0: '<p>&lt;%- contact.first_name %&gt;,</p><p></p><p>Thank you for filling out our form</p>',
            padding: 16
          }]
        },
        footer: {
          blocks: [{
            type: 'preferences',
            text: '<p>This email was sent to <strong><%- contact.email %></strong>. If you would like to control how much email you recieve from us, you can <a href="<%- email.preferences_link %>">adjust your preferences</a></p>',
            padding: 8,
            p_font_size: 12,
            p_text_align: 'center',
            p_line_height: 1.5
          }]
        }
      },
      settings: {
        sender_id,
        subject,
        reply_to,
        preview_text: subject
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

  const model = form || event

  await model.save({
    workflow_id: workflow.get('id'),
    email_id: email.get('id')
  }, {
    transacting: req.trx
  })

}

export default createConfirmationWorkflow
