import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import generateCode from '../../../../../core/utils/generate_code'
import FormSerializer from '../../../serializers/form_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Workflow from '../../../models/workflow'
import Program from '../../../models/program'
import Email from '../../../models/email'
import Form from '../../../models/form'

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

  const form = await Form.forge({
    team_id: req.team.get('id'),
    status: 'draft',
    code,
    program_id: program.get('id'),
    ...whitelist(req.body, ['title'])
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
