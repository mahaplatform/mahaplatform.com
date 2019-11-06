import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import generateCode from '../../../../../core/utils/generate_code'
import FormSerializer from '../../../serializers/form_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Workflow from '../../../models/workflow'
import Email from '../../../models/email'
import Form from '../../../models/form'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'crm_forms'
  })

  const form = await Form.forge({
    team_id: req.team.get('id'),
    status: 'draft',
    code,
    ...whitelist(req.body, ['program_id','title'])
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: form
  })

  const workflowCode = await generateCode(req, {
    table: 'crm_workflows'
  })

  const workflow = await Workflow.forge({
    team_id: req.team.get('id'),
    program_id: form.get('program_id'),
    code: workflowCode,
    status: 'draft',
    steps: [],
    trigger_type: 'form',
    form_id: form.get('id'),
    title: 'Confirmation'
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
    sender_id: req.body.sender_id,
    title: 'Confirmation',
    code: emailCode,
    subject: req.body.subject,
    reply_to: req.body.reply_to,
    config: {}
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: email
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
