import { activity } from '../../../../../core/services/routes/activities'
import generateCode from '../../../../../core/utils/generate_code'
import FormSerializer from '../../../serializers/form_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import WorkflowStep from '../../../models/workflow_step'
import Workflow from '../../../models/workflow'
import Template from '../../../models/template'
import Program from '../../../models/program'
import Email from '../../../models/email'
import Form from '../../../models/form'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.whereIn('crm_program_user_access.type', ['manage','edit'])
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', req.body.program_id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const code = await generateCode(req, {
    table: 'crm_forms'
  })

  const generateFieldCode = () => {
    return _.random(100000, 999999).toString(36)
  }

  const form = await Form.forge({
    team_id: req.team.get('id'),
    code,
    program_id: program.get('id'),
    title: req.body.title,
    config: {
      fields: [
        { label: 'First Name', name: { value: 'First Name', token: 'first_name' }, code: generateFieldCode(), required: true, type: 'contactfield', contactfield: { label: 'First Name', name: 'first_name', type: 'textfield'} },
        { label: 'Last Name', name: { value: 'Last Name', token: 'last_name' }, code: generateFieldCode(), required: true, type: 'contactfield', contactfield: { label: 'Last Name', name: 'last_name', type: 'textfield'} },
        { label: 'Email', name: { value: 'Email', token: 'email' }, code: generateFieldCode(), required: true, type: 'contactfield', contactfield: { label: 'Email', name: 'email', type: 'textfield'} }
      ],
      body: {
        background_color: '#FFFFFF',
        button_text: 'Submit'
      },
      confirmation: {
        strategy: 'message',
        message: 'Thank You!'
      },
      limits: {},
      page: {
        background_color: '#EEEEEE'
      },
      security: {
        captcha: true
      },
      seo: {
        title: req.body.title,
        description: '',
        permalink: ''
      }
    }
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: form
  })

  const template = req.body.template_id ? await Template.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.body.template_id)
  }).fetch({
    transacting: req.trx
  }) : null

  const workflowCode = await generateCode(req, {
    table: 'crm_workflows'
  })

  const workflow = await Workflow.forge({
    team_id: req.team.get('id'),
    form_id: form.get('id'),
    program_id: program.get('id'),
    code: workflowCode,
    status: 'active',
    trigger_type: 'response'
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: workflow
  })

  const emailCode = await generateCode(req, {
    table: 'crm_emails'
  })

  const email = await Email.forge({
    team_id: req.team.get('id'),
    workflow_id: workflow.get('id'),
    program_id: program.get('id'),
    title: 'Confirmation',
    code: emailCode,
    config: template ? template.get('config') : {
      header: {
        blocks: [{
          type: 'web',
          text: '<p>Not displaying correctly? <a href="<%- email.web_link %>">View in browser</a></p>',
          padding: 8,
          font_size: 12,
          text_align: 'center',
          line_height: 1.5
        }]
      },
      body: {
        blocks: [{
          type: 'text',
          content_0: '<p>&lt;%- contact.first_name %&gt;,</p><p>Thank you for filling out our form</p>',
          padding: 16
        }]
      },
      footer: {
        blocks: [{
          type: 'preferences',
          text: '<p>This email was sent to <strong><%- contact.email %></strong>. If you would like to control how much email you recieve from us, you can <a href="<%- email.preferences_link %>">adjust your preferences</a></p>',
          padding: 8,
          font_size: 12,
          text_align: 'center',
          line_height: 1.5
        }]
      },
      settings: {
        sender_id: req.body.sender_id,
        subject: req.body.subject,
        reply_to: req.body.reply_to,
        preview_text: 'Thank you for filling out our form'
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
    config: {
      email: {
        id: email.get('id'),
        title: 'Confirmation'
      }
    }
  }).save(null, {
    transacting: req.trx
  })

  await form.save({
    workflow_id: workflow.get('id'),
    email_id: email.get('id')
  }, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: form
  })

  await socket.refresh(req, [
    '/admin/crm/forms'
  ])

  res.status(200).respond(form, FormSerializer)

}

export default createRoute
