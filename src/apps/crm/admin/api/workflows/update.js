import WorkflowSerializer from '../../../serializers/workflow_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { updateSteps } from '../../../services/workflows'
import Workflow from '../../../models/workflow'

const updateRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program','steps'],
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  if(req.body.title) {
    await workflow.save({
      ...whitelist(req.body, ['title'])
    }, {
      patch: true,
      transacting: req.trx
    })
  }

  if(req.body.steps) {
    await updateSteps(req, {
      workflow,
      steps: req.body.steps
    })
  }

  res.status(200).respond(workflow, WorkflowSerializer)

}

export default updateRoute
