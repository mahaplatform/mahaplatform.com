import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import WorkflowSerializer from '../../../serializers/workflow_serializer'
import generateCode from '../../../../../core/utils/generate_code'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Workflow from '../../../models/workflow'
import Program from '../../../models/program'

const getTitle = ({ action, title, trigger_type }) => {
  if(trigger_type === 'list' && action === 'add') return 'Add to List Workflow'
  if(trigger_type === 'list' && action === 'remove') return 'Remove from List Workflow'
  if(trigger_type === 'topic' && action === 'add') return 'Add to Topic Workflow'
  if(trigger_type === 'topic' && action === 'remove') return 'Remove from Topic Workflow'
  if(trigger_type === 'open') return 'Email Open Workflow'
  if(trigger_type === 'click') return 'Email Click Workflow'
  if(trigger_type === 'property') return 'Update Property Workflow'
  return title
}

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
    table: 'crm_workflows'
  })

  const workflow = await Workflow.forge({
    team_id: req.team.get('id'),
    code,
    status: 'draft',
    program_id: program.get('id'),
    title: getTitle(req.body),
    ...whitelist(req.body, ['trigger_type','action','form_id','email_id','list_id','topic_id','purpose','is_unique'])
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
    '/admin/crm/workflows'
  ])

  res.status(200).respond(workflow, WorkflowSerializer)

}

export default createRoute
