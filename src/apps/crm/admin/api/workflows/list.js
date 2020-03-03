import WorkflowSerializer from '../../../serializers/workflow_serializer'
import Workflow from '../../../models/workflow'

const listRoute = async (req, res) => {

  const workflows = await Workflow.filterFetch({
    scope: (qb) => {
      qb.select('crm_workflows.*','crm_workflow_results.*')
      qb.innerJoin('crm_workflow_results','crm_workflow_results.workflow_id','crm_workflows.id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_workflows.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('crm_workflows.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['trigger_type','program_id','id']
    },
    sort: {
      params: req.query.$sort,
      defaults:  '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['program.logo'],
    transacting: req.trx
  })

  res.status(200).respond(workflows, WorkflowSerializer)

}

export default listRoute
