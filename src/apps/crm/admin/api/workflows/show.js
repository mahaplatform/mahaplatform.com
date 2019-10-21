import WorkflowSerializer from '../../../serializers/workflow_serializer'
import Workflow from '../../../models/workflow'

const showRoute = async (req, res) => {

  const workflow = await Workflow.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('code', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  res.status(200).respond(workflow, WorkflowSerializer)

}

export default showRoute
