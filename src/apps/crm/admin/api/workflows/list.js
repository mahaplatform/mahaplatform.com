import WorkflowSerializer from '../../../serializers/workflow_serializer'
import Workflow from '../../../models/workflow'

const listRoute = async (req, res) => {

  const workflows = await Workflow.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['program_id']
  }).sort({
    defaultSort:  '-created_at',
    sortParams: ['created_at']
  }).fetchPage({
    withRelated: ['program'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(workflows, WorkflowSerializer)

}

export default listRoute
