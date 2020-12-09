import WorkflowSerializer from '@apps/automation/serializers/workflow_serializer'
import Workflow from '@apps/automation/models/workflow'

const listRoute = async (req, res) => {

  const workflows = await Workflow.filterFetch({
    scope: (qb) => {
      qb.select('automation_workflows.*','automation_workflow_results.*')
      qb.innerJoin('automation_workflow_results','automation_workflow_results.workflow_id','automation_workflows.id')
      qb.joinRaw('inner join crm_programs on crm_programs.id=automation_workflows.program_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=automation_workflows.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('automation_workflows.team_id', req.team.get('id'))
      qb.whereNull('deleted_at')
    },
    aliases: {
      active_count: 'automation_workflow_results.active_count',
      completed_count: 'automation_workflow_results.completed_count',
      converted_count: 'automation_workflow_results.converted_count',
      enrolled_count: 'automation_workflow_results.enrolled_count',
      lost_count: 'automation_workflow_results.lost_count',
      program: 'crm_programs.title'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['trigger_type','program_id','id']
    },
    sort: {
      params: req.query.$sort,
      defaults:  '-created_at',
      allowed: ['id','active_count','completed_count','converted_count','enrolled_count','lost_count','program','created_at']
    },
    page: req.query.$page,
    withRelated: ['email','email_campaign','event','form','list','program.logo','program.phone_number','topic'],
    transacting: req.trx
  })

  res.status(200).respond(workflows, WorkflowSerializer)

}

export default listRoute
