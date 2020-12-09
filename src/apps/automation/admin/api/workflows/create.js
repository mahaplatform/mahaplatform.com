import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import WorkflowSerializer from '@apps/automation/serializers/workflow_serializer'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Program from '@apps/crm/models/program'
import Workflow from '@apps/automation/models/workflow'

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
    table: 'automation_workflows'
  })

  const workflow = await Workflow.forge({
    team_id: req.team.get('id'),
    code,
    status: 'draft',
    program_id: program.get('id'),
    ...whitelist(req.body, ['trigger_type','title','action','form_id','email_id','email_campaign_id','event_id','store_id','list_id','topic_id','purpose','is_unique','status'])
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: workflow
  })

  await activity(req, {
    story: 'created {object}',
    object: workflow
  })

  await socket.refresh(req, [
    '/admin/automation/workflows',
    ...workflow.get('list_id') ? [`/admin/crm/programs/${workflow.get('program_id')}/lists/${workflow.get('list_id')}`] : [],
    ...workflow.get('topic_id') ? [`/admin/crm/programs/${workflow.get('program_id')}/topics/${workflow.get('topic_id')}`] : [],
    ...workflow.get('email_campaign_id') ? [`/admin/campaigns/email/${workflow.get('email_campaign_id')}`] : [],
    ...workflow.get('event_id') ? [`/admin/events/events/${workflow.get('event_id')}`] : [],
    ...workflow.get('form_id') ? [`/admin/forms/forms/${workflow.get('form_id')}`] : [],
    ...workflow.get('store_id') ? [`/admin/stores/stores/${workflow.get('store_id')}`] : []
  ])

  res.status(200).respond(workflow, WorkflowSerializer)

}

export default createRoute
