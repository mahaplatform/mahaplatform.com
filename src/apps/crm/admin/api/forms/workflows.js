import WorkflowSerializer from '../../../serializers/workflow_serializer'
import Form from '../../../models/form'

const workflowsRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['workflows.program'],
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  res.status(200).respond(form.related('workflows'), WorkflowSerializer)

}

export default workflowsRoute
