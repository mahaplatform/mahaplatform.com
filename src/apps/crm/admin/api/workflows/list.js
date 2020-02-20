import WorkflowSerializer from '../../../serializers/workflow_serializer'
import Workflow from '../../../models/workflow'

const listRoute = async (req, res) => {

  const workflows = await Workflow.filterFetch({
    scope: (qb) => {
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_workflows.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('crm_workflows.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['program_id']
    },
    sort: {
      params: req.query.$sort,
      defaults:  '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(workflows, WorkflowSerializer)

}

export default listRoute
