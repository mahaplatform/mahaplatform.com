import WorkflowSerializer from '../../../serializers/workflow_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import Workflow from '../../../models/workflow'

const updateRoute = async (req, res) => {

  const workflow = await Workflow.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('code', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  await workflow.save({
    ...whitelist(req.body, ['title','steps'])
  }, {
    patch: true,
    transacting: req.trx
  })

  res.status(200).respond(workflow, WorkflowSerializer)

}

export default updateRoute
